const axios = require('axios');
const csv = require('csvtojson');
const countryMap = require('./countryMap');
const country_utils = require('../utils/country_utils');
const string_utils = require('../utils/string_utils');

// eslint-disable-next-line max-len
const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';

/**
 * Retrieves csv data files from JHU repo
 * @returns {Promise}	Promise of raw csv data
 */
async function getCsvData() {
	let casesResponse;
	let deathsResponse;
	let recoveredResponse;
	try {
		casesResponse = await axios.get(`${base}time_series_covid19_confirmed_global.csv`);
		deathsResponse = await axios.get(`${base}time_series_covid19_deaths_global.csv`);
		recoveredResponse = await axios.get(`${base}time_series_covid19_recovered_global.csv`);
		return { casesResponse, deathsResponse, recoveredResponse };
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
	const { casesResponse, deathsResponse, recoveredResponse } = await getCsvData();
	const parsedCases = await parseCsvData(casesResponse.data);
	const parsedDeaths = await parseCsvData(deathsResponse.data);
	const parsedRecovered = await parseCsvData(recoveredResponse.data);
	// console.log(parsedRecovered);
	// dates key for timeline
	const timelineKey = parsedCases[0].splice(4);
	// format csv data to response
	const result = Array(parsedCases.length).fill({}).map((_, index) => {
		const newElement = {
			country: '', countryInfo: {}, province: null, timeline: { cases: {}, deaths: {}, recovered: {} }
		};
		const cases = parsedCases[index].splice(4);
		const deaths = parsedDeaths[index].splice(4);
		const recovered = (parsedRecovered[index] || []).splice(4);

		for (let i = 0; i < cases.length; i++) {
			newElement.timeline.cases[timelineKey[i]] = parseInt(cases[i]);
			newElement.timeline.deaths[timelineKey[i]] = parseInt(deaths[i]);
			newElement.timeline.recovered[timelineKey[i]] = parseInt(recovered[i] || 0);
		}

		const countryData = country_utils.getCountryData(parsedCases[index][1]);
		newElement.country = countryData.country || parsedCases[index][1];
		newElement.countryInfo = countryData;
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
 * @param 	{string}	query   	Country query param
 * @param 	{string}	province  	Province query param (optional)
 * @returns {Object}				The filtered historical data.
 */
const getHistoricalCountryDataV2 = (data, query, province = null) => {
	const countryINFO = country_utils.getCountryData(query);

	const filteredData = data.find((item) => {
		if (isNaN(query)) {
			if (province) {
				return item.province && item.province === province &&
					((item.countryInfo.country || 'null') === countryINFO.country ||
						(item.countryInfo.iso2 || 'null') === countryINFO.iso2 ||
						(item.countryInfo.iso3 || 'null') === countryINFO.iso3);
			}
			return ((item.countryInfo.country || 'null') === countryINFO.country ||
				(item.countryInfo.iso2 || 'null') === countryINFO.iso2 ||
				(item.countryInfo.iso3 || 'null') === countryINFO.iso3);
		}

		if (province) {
			return item.province && item.province === province &&
				item.countryInfo._id === Number(query);
		}
		return item.countryInfo._id === Number(query);
	});

	if (filteredData)
		delete (filteredData.countryInfo);

	// if (filteredData)
	// 	filteredData.forEach(item => {
	// 		delete (item.countryInfo);
	// 	});
	return filteredData;
}

module.exports = {
	historicalV2,
	getHistoricalCountryDataV2
};
