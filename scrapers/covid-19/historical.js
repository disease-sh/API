const axios = require('axios');
const nameUtils = require('../../utils/nameUtils');
const stringUtils = require('../../utils/stringUtils');
const csvUtils = require('../../utils/csvUtils');
const logger = require('../../utils/logger');

// eslint-disable-next-line max-len
const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';

/**
 * Formats recovered data from JHU to match cases data in length and format
 * @param 	{array}		cases 		JSON formatted cases data from JHU csv file
 * @param 	{array} 	recovered 	JSON formatted recovered data from JHU csv file
 * @returns {array} 				JSON formatted recovered data in same structure as cases data
 */
function formatRecoveredData(cases, recovered) {
	const dates = Object.keys(cases[0]).slice(4);
	const countries = cases.map((country) => ({
		name: country['Country/Region'],
		province: country['Province/State'] || '',
		Lat: country.Lat || '',
		Long: country.Long || ''
	}));
	return countries.map((country) => {
		const provinces = recovered.filter(el => el['Country/Region'] === country.name && el['Province/State'] === country.province);
		dates.forEach(date => {
			country[date] = provinces[0] ? parseInt(provinces[0][date]) : 0;
		});
		return country;
	});
}

/**
 * Fills redis with JHU csv country timeline data
 * @param 	{string}	keys 	config countries key
 * @param 	{Object}	redis 	Redis db
 */
const historicalV2 = async (keys, redis) => {
	const timelineIndex = 4;
	let casesResponse, deathsResponse, recoveredResponse;
	try {
		casesResponse = await axios.get(`${base}time_series_covid19_confirmed_global.csv`);
		deathsResponse = await axios.get(`${base}time_series_covid19_deaths_global.csv`);
		recoveredResponse = await axios.get(`${base}time_series_covid19_recovered_global.csv`);
	} catch (err) {
		logger.err(err, 'error in Global JHUhistorical REQUEST');
		return;
	}
	const parsedCases = await csvUtils.parseCsvData(casesResponse.data);
	const parsedDeaths = await csvUtils.parseCsvData(deathsResponse.data);
	const parsedRecovered = await csvUtils.parseCsvData(recoveredResponse.data);
	// JHU Data is very poorly formatted, but we fix it :)
	const formatedRecovered = formatRecoveredData(parsedCases, parsedRecovered);
	// dates key for timeline
	const timelineKey = Object.keys(parsedCases[0]).splice(timelineIndex);
	// format csv data to response
	const result = parsedCases.map((_, index) => {
		const newElement = {
			country: '', countryInfo: {}, province: null, timeline: { cases: {}, deaths: {}, recovered: {} }
		};
		const cases = Object.values(parsedCases[index]).splice(timelineIndex);
		const deaths = Object.values(parsedDeaths[index]).splice(timelineIndex);
		const recovered = Object.values(formatedRecovered[index]).splice(timelineIndex);

		for (let i = 0; i < cases.length; i++) {
			newElement.timeline.cases[timelineKey[i]] = parseInt(cases[i]);
			newElement.timeline.deaths[timelineKey[i]] = parseInt(deaths[i]);
			newElement.timeline.recovered[timelineKey[i]] = parseInt(recovered[i] || 0);
		}

		// add country info to support iso2/3 queries
		const parsedAtIndex = Object.values(parsedCases)[index];
		const countryData = nameUtils.getCountryData(parsedAtIndex['Country/Region'].replace('*', ''));
		newElement.country = countryData.country || parsedAtIndex['Country/Region'];
		newElement.countryInfo = countryData;
		newElement.province = parsedAtIndex['Province/State'] === '' ? null
			: parsedAtIndex['Province/State'].toLowerCase();
		return newElement;
	});

	redis.set(keys.historical_v2, JSON.stringify(result));
	logger.info(`Updated JHU CSSE Historical: ${result.length} locations`);
};

/**
 * Parses data from historical endpoint and returns data for each country & province
 * @param 	{array}		data		Full historical data returned from /historical endpoint
 * @param 	{string}	lastdays  	How many days to show always take lastest
 * @returns {Object}				The filtered historical data.
 */
const getHistoricalDataV2 = (data, lastdays = 30) => {
	lastdays = stringUtils.getLastDays(lastdays);
	return data.map(country => {
		delete country.countryInfo;
		const cases = {}, deaths = {}, recovered = {};
		Object.keys(country.timeline.cases).slice(lastdays * -1).forEach(key => {
			cases[key] = country.timeline.cases[key];
			deaths[key] = country.timeline.deaths[key];
			recovered[key] = country.timeline.recovered[key];
			return true;
		});
		country.timeline = { cases, deaths, recovered };
		return country;
	});
};

/**
 * Parses data from historical endpoint and returns data for specific country || province
 * @param 	{array}		data		Full historical data returned from /historical endpoint
 * @param 	{string}	query   	Country query param
 * @param 	{string}	province  	Province query param (optional)
 * @param 	{string}	lastdays  	How many days to show always take lastest
 * @returns {Object}				The filtered historical data.
 */
const getHistoricalCountryDataV2 = (data, query, province = null, lastdays = 30) => {
	lastdays = stringUtils.getLastDays(lastdays);
	const countryInfo = nameUtils.getCountryData(query);
	const standardizedCountryName = stringUtils.wordsStandardize(countryInfo.country ? countryInfo.country : query);
	// filter to either specific province, or provinces to sum country over
	const countryData = data.filter(item => {
		const deepMatch = () => stringUtils.wordsStandardize(item.country) === standardizedCountryName
			&& item.countryInfo.iso2 === countryInfo.iso2
			&& item.countryInfo.iso3 === countryInfo.iso3
			&& item.countryInfo._id === countryInfo._id;
		if (item.countryInfo.country) {
			if (province) {
				return (item.province === province.toLowerCase() || (item.province === null && province.toLowerCase() === 'mainland'))
					&& deepMatch();
			}
			return deepMatch();
		}
		return stringUtils.wordsStandardize(item.country) === standardizedCountryName;
	});
	if (countryData.length === 0) return null;

	// overall timeline for country
	const timeline = { cases: {}, deaths: {}, recovered: {} };
	const provinces = [];
	countryData.forEach((_, index) => {
		countryData[index].province ? provinces.push(countryData[index].province) : provinces.push('mainland');
		// loop cases, deaths for each province
		Object.keys(countryData[index].timeline).forEach((specifier) => {
			Object.keys(countryData[index].timeline[specifier]).slice(lastdays * -1).forEach((date) => {
				// eslint-disable-next-line no-unused-expressions
				timeline[specifier][date] ? timeline[specifier][date] += parseInt(countryData[index].timeline[specifier][date])
					: timeline[specifier][date] = parseInt(countryData[index].timeline[specifier][date]);
			});
		});
	});
	return {
		country: countryData[0].country || standardizedCountryName,
		province: province ? countryData[0].province || province : provinces,
		timeline
	};
};

/**
 * Parses data from historical endpoint and returns summed global statistics
 * @param 	{array} 	data 		Full historical data returned from /historical endpoint
 * @param	{string}	lastdays  	How many days to show always take lastest
 * @returns {Object}				The global deaths and cases
 */
const getHistoricalAllDataV2 = (data, lastdays = 30) => {
	lastdays = stringUtils.getLastDays(lastdays);
	const cases = {};
	const deaths = {};
	const recovered = {};
	data.forEach(country => {
		Object.keys(country.timeline.cases).slice(lastdays * -1).forEach(key => {
			/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
			cases[key] ? cases[key] += country.timeline.cases[key] : cases[key] = country.timeline.cases[key];
			deaths[key] ? deaths[key] += country.timeline.deaths[key] : deaths[key] = country.timeline.deaths[key];
			recovered[key] ? recovered[key] += country.timeline.recovered[key] : recovered[key] = country.timeline.recovered[key];
			return true;
		});
		return true;
	});
	return {
		cases,
		deaths,
		recovered
	};
};

/**
 * Gets all historical US county data and stores in redis
 * @param 	{string}	keys 	config countries key
 * @param 	{Object}	redis 	Redis db
 */
const getHistoricalUSADataV2 = async (keys, redis) => {
	let casesResponse, deathsResponse;
	try {
		casesResponse = await axios.get(`${base}time_series_covid19_confirmed_US.csv`);
		deathsResponse = await axios.get(`${base}time_series_covid19_deaths_US.csv`);
	} catch (err) {
		logger.err('Error: Requesting JHUHistorical USA failed!', err);
		return;
	}
	const parsedCases = await csvUtils.parseCsvData(casesResponse.data);
	const parsedDeaths = await csvUtils.parseCsvData(deathsResponse.data);
	const timelineKey = Object.keys(parsedCases[0]).splice(11);
	const result = parsedCases.map((_, index) => {
		const newElement = {
			province: null, county: null, timeline: { cases: {}, deaths: {} }
		};
		const cases = Object.values(parsedCases[index]).splice(11);
		const deaths = Object.values(parsedDeaths[index]).splice(12);

		for (let i = 0; i < cases.length; i++) {
			newElement.timeline.cases[timelineKey[i]] = parseInt(cases[i]);
			newElement.timeline.deaths[timelineKey[i]] = parseInt(deaths[i]);
		}
		const element = Object.values(parsedCases)[index];
		newElement.province = element.Province_State === '' ? null
			: element.Province_State.toLowerCase();
		newElement.county = element.Admin2 === '' ? null
			: element.Admin2.toLowerCase();
		return newElement;
	});
	redis.set(keys.historical_v2_USA, JSON.stringify(result));
	logger.info(`Updated JHU CSSE Historical USA: ${result.length} locations`);
};

/**
 * Parses data from USA historical redis cache store and returns provinces supported
 * @param 	{array} 	data 	Full historical data returned from USA historical cache
 * @returns {Object}			Possible provinces supported by USA historical data
 */
const getHistoricalUSAProvincesV2 = (data) =>
	data.filter((element, index, self) => self.findIndex(
		(x1) => x1.province === element.province) === index).map(element => element.province);

/**
 * Gets historical data for all counties in a specified state
 * @param 	{array} 	data 		Full historical data returned from USA historical cache
 * @param 	{string} 	state 		State name path variable
 * @param 	{string}	lastdays  	How many days to show always take lastest
 * @returns {array} 				Array of objects with county case and death information
 */
const getHistoricalUSAStateDataV2 = (data, state, lastdays = null) => {
	lastdays = stringUtils.getLastDays(lastdays);
	return data.filter(county => county.province === state)
		.map((county) => {
			const cases = {}, deaths = {};
			Object.keys(county.timeline.cases).slice(-lastdays).forEach(key => {
				cases[key] = county.timeline.cases[key];
				deaths[key] = county.timeline.deaths[key];
				return true;
			});
			county.timeline = { cases, deaths };
			return county;
		});
};

module.exports = {
	historicalV2,
	getHistoricalDataV2,
	getHistoricalCountryDataV2,
	getHistoricalAllDataV2,
	getHistoricalUSADataV2,
	getHistoricalUSAProvincesV2,
	getHistoricalUSAStateDataV2
};
