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
 * @param   {array}   data       Full historical data returned from /historical endpoint
 * @param   {string}  country   Country query param
 * @param   {string}  province  Province query param (optional)
 * @returns  {onbject}             The filtered historical data.
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
	for (let prov = 0; prov < countryData.length; prov++) {
		// loop cases, recovered, deaths for each province
		Object.keys(countryData[prov].timeline).forEach((specifier) => {
			Object.keys(countryData[prov].timeline[specifier]).forEach((date) => {
				if (timeline[specifier][date]) {
					timeline[specifier][date] += parseInt(countryData[prov].timeline[specifier][date]);
				} else {
					timeline[specifier][date] = parseInt(countryData[prov].timeline[specifier][date]);
				}
			});
		});
	}

	return {
		country: standardizedCountryName,
		timeline
	};
}

module.exports = {
	historicalV2,
	getHistoricalCountryDataV2
};
