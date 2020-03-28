const axios = require('axios');
const csv = require('csvtojson');
const countryMap = require('./countryMap');

// eslint-disable-next-line max-len
const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';

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

async function parseCsvData(data) {
	const parsedData = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(data);
	return parsedData;
}

const historicalV2 = async (keys, redis) => {
	const { casesResponse, deathsResponse } = await getCsvData();
	const parsedCases = await parseCsvData(casesResponse.data);
	const parsedDeaths = await parseCsvData(deathsResponse.data);
	// dates key for timeline
	const timelineKey = parsedCases[0].splice(4);

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

	const removeFirstObj = result.splice(1);
	const string = JSON.stringify(removeFirstObj);
	redis.set(keys.historical_v2, string);
	return console.log(`Updated JHU CSSE Historical: ${removeFirstObj.length} locations`);
};

/**
 * Parses data from historical endpoint and returns data for specific country || province
 * @param   {Array}   data       Full historical data returned from /historical endpoint
 * @param   {String}  qCountry   Country query param
 * @param   {String}  qProvince  Province query param (optional)
 * @return  {Object}             The filtered historical data.
 */

async function getHistoricalCountryDataV2(data, qCountry, qProvince) {
	// find the standardized country name
	const standardizedCountryName = countryMap.standardizeCountryName(qCountry.toLowerCase());
	// get all the country data
	const countryData = data.filter(obj => obj.country.toLowerCase() === standardizedCountryName);
	// overall timeline for country
	const timeline = { cases: {}, deaths: {} };
	// Creates timeline data for specified country or provice.
	const summarizeData = (provinceIndex) => {
		// loop cases, deaths for each province
		for (var tProp in timeline) {
			Object.assign(timeline, {
				[tProp]: [provinceIndex ? countryData[provinceIndex].timeline[tProp] : countryData.map(cData => cData.timeline[tProp])].reduce((acc, cur) => {
					Object.keys(cur).map(type => (acc[type] = (acc[type] || 0) + cur[type]));
					return acc;
				})
			});
		}
	};

	// check if there is matching province in the country data and return its index.
	const qProvinceMatchIndex = countryData.findIndex(country => country.province && country.province.toLowerCase() === qProvince);

	// if there there is a match province, only summarize the data for it
	if (!qProvince || qProvinceMatchIndex >= 0) {
		summarizeData(qProvince && qProvinceMatchIndex >= 0 && qProvinceMatchIndex);
	}

	// return the country summarized data including if a province was requested
	return (
		Object.assign(
			// add the province property if its passed and if there is a match, include the timeline data for it
			qProvince ? { province: qProvinceMatchIndex >= 0 ? countryData[qProvinceMatchIndex].province : qProvince } : {},
			{
				country: standardizedCountryName,
				timeline
			}
		)
	);
}

module.exports = {
	historicalV2,
	getHistoricalCountryDataV2
};
