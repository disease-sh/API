const axios = require('axios');
const csv = require('csvtojson');
const countryMap = require('./countryMap');

// eslint-disable-next-line max-len
const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';

/**
 * Retrieves csv data files from JHU repo
 * @returns {Promise}	Promise of raw csv data
 */
async function getCsvData() {
	let casesResponse;
	let deathsResponse;
	try {
		casesResponse = await axios.get(`${base}time_series_covid19_confirmed_global.csv`);
		deathsResponse = await axios.get(`${base}time_series_covid19_deaths_global.csv`);
		return { casesResponse, deathsResponse };
	} catch (err) {
		console.log(err);
		return null;
	}
}

/**
 * Parses csv file to program readable format
 * @param 	{Object}	data	Raw csv data
 * @returns {array}				Array of parsed csv data
 */
async function parseCsvData(data) {
	const parsedData = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(data);
	return parsedData;
}

/**
 * Parses JHU csv data for country timeline data
 * @param 	{string}	keys 	config countries key
 * @param 	{Object}	redis 	Redis db
 * @returns {array}				Array of objects containing historical data on country/province
 */
const historicalV2 = async (keys, redis) => {
	const { casesResponse, deathsResponse } = await getCsvData();
	const parsedCases = await parseCsvData(casesResponse.data);
	const parsedDeaths = await parseCsvData(deathsResponse.data);
	// dates key for timeline
	const timelineKey = parsedCases[0].splice(4);
	// format csv data to response
	const result = Array(parsedCases.length).fill({}).map((_, index) => {
		const newElement = { country: '', province: null, timeline: { cases: {}, deaths: {} } };
		const cases = parsedCases[index].splice(4);
		const deaths = parsedDeaths[index].splice(4);
		for (let i = 0; i < cases.length; i++) {
			newElement.timeline.cases[timelineKey[i]] = parseInt(cases[i]);
			newElement.timeline.deaths[timelineKey[i]] = parseInt(deaths[i]);
		}
		newElement.country = countryMap.standardizeCountryName(parsedCases[index][1].toLowerCase());
		newElement.province = parsedCases[index][0] === '' ? null
			: countryMap.standardizeCountryName(parsedCases[index][0].toLowerCase());
		return newElement;
	});
	// first object is filler, don't need it
	const removeFirstObj = result.splice(1);
	const string = JSON.stringify(removeFirstObj);
	redis.set(keys.historical_v2, string);
	return console.log(`Updated JHU CSSE Historical: ${removeFirstObj.length} locations`);
};

/**
 * Parses data from historical endpoint and returns data for specific country || province
 * @param 	{array}		data		Full historical data returned from /historical endpoint
 * @param 	{string}	country   	Country query param
 * @param 	{string}	province  	Province query param (optional)
 * @returns {Object}				The filtered historical data.
 */
async function getHistoricalCountryDataV2(data, country, province = null) {
	const standardizedCountryName = countryMap.standardizeCountryName(country.toLowerCase());
	// filter to either specific province, or provinces to sum country over
	const countryData = data.filter((obj) => {
		if (province) {
			return obj.province && obj.province === province && obj.country.toLowerCase() === standardizedCountryName;
		} else {
			return obj.country.toLowerCase() === standardizedCountryName;
		}
	});
	// overall timeline for country
	const timeline = { cases: {}, deaths: {} };
	// sum over provinces
	countryData.forEach((_, index) => {
		// loop cases, deaths for each province
		Object.keys(countryData[index].timeline).forEach((specifier) => {
			Object.keys(countryData[index].timeline[specifier]).forEach((date) => {
				// eslint-disable-next-line no-unused-expressions
				timeline[specifier][date] ? timeline[specifier][date] += parseInt(countryData[index].timeline[specifier][date])
					: timeline[specifier][date] = parseInt(countryData[index].timeline[specifier][date]);
			});
		});
	});
	return {
		country: standardizedCountryName,
		timeline
	};
}

/**
 * Parses data from historical endpoint and returns summed global statistics
 * @param {array} data Full historical data returned from /historical endpoint
 * @returns {Object}	The global deaths and cases
 */
async function getHistoricalAllDataV2(data) {
	const cases = {};
	const deaths = {};
	data.forEach(country => {
		Object.keys(country.timeline.cases).forEach(key => {
			/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
			cases[key] ? cases[key] += country.timeline.cases[key] : cases[key] = country.timeline.cases[key];
			deaths[key] ? deaths[key] += country.timeline.deaths[key] : deaths[key] = country.timeline.deaths[key];
			return true;
		});
		return true;
	});
	return {
		cases,
		deaths
	};
}

module.exports = {
	historicalV2,
	getHistoricalCountryDataV2,
	getHistoricalAllDataV2
};
