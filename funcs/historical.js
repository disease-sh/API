const axios = require('axios');
const csv = require('csvtojson');
const countryMap = require('./countryMap');

// eslint-disable-next-line max-len
const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';

const historicalV2 = async (keys, redis) => {
	let casesResponse;
	let deathsResponse;
	try {
		casesResponse = await axios.get(`${base}time_series_covid19_confirmed_global.csv`);
		deathsResponse = await axios.get(`${base}time_series_covid19_deaths_global.csv`);
	} catch (err) {
		console.log(err);
		return null;
	}

	const parsedCases = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(casesResponse.data);

	const parsedDeaths = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(deathsResponse.data);

	// to store parsed data
	const result = [];
	// dates key for timeline
	const timelineKey = parsedCases[0].splice(4);

	// loop over all country entries
	for (let b = 0; b < parsedDeaths.length; b++) {
		const timeline = {
			cases: {},
			deaths: {}
		};
		const cases = parsedCases[b].splice(4);
		const deaths = parsedDeaths[b].splice(4);
		for (let i = 0; i < cases.length; i++) {
			timeline.cases[timelineKey[i]] = parseInt(cases[i]);
			timeline.deaths[timelineKey[i]] = parseInt(deaths[i]);
		}
		result.push({
			country: countryMap.standardizeCountryName(parsedCases[b][1].toLowerCase()),
			province: parsedCases[b][0] === '' ? null
				: countryMap.standardizeCountryName(parsedCases[b][0].toLowerCase()),
			timeline
		});
	}

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
		Object.keys(countryData[provinceIndex].timeline).forEach(specifier => {
			Object.keys(countryData[provinceIndex].timeline[specifier]).forEach(date => {
				if (timeline[specifier][date]) {
					timeline[specifier][date] += parseInt(countryData[provinceIndex].timeline[specifier][date]);
				} else {
					timeline[specifier][date] = parseInt(countryData[provinceIndex].timeline[specifier][date]);
				}
			});
		});
	};
	// check if there is matching province in the country data and return its index.
	const qProvinceMatchIndex = countryData.findIndex(country => country.province && country.province.toLowerCase() === qProvince);

	// if there there is a match province, only summarize the data for it
	if (qProvince && qProvinceMatchIndex >= 0) {
		summarizeData(qProvinceMatchIndex);
	}
	if (!qProvince) {
		// otherwise, summarize all provincial data
		for (var province = 0; province < countryData.length; province++) {
			summarizeData(province);
		}
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
