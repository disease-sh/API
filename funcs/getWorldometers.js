const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');

function getCountryData(cell) {
	let country = (cell.children[0].data
		|| cell.children[0].children[0].data
		// country name with link has another level
		|| cell.children[0].children[0].children[0].data
		|| cell.children[0].children[0].children[0].children[0].data
		|| '').trim();
	if (country.length === 0) {
		// parse with hyperlink
		country = (cell.children[0].next.children[0].data || '').trim();
	}
	return country;
}

function getCellData(cell) {
	const data = cell.children.length !== 0 ? cell.children[0].data : '';
	return parseInt(
		data.trim().replace(/,/g, '') || '0',
		10
	);
}

function fillResult(html, yesterday = false) {
	// to store parsed data
	const result = [];
	// NOTE: this will change when table format change in website
	const totalColumns = 11;
	const countryColIndex = 0;
	const casesColIndex = 1;
	const newCasesColIndex = 2;
	const deathsColIndex = 3;
	const newDeathsColIndex = 4;
	const curedColIndex = 5;
	const activeColIndex = 6;
	const criticalColIndex = 7;
	const casesPerOneMillionColIndex = 8;
	const deathsPerOneMillionColIndex = 9;

	const countriesTable = yesterday ? html('table#main_table_countries_yesterday') : html('table#main_table_countries_today');
	const countriesTableCells = countriesTable
		.children('tbody')
		.children('tr')
		.children('td');

	// minus totalColumns to skip last row, which is total
	for (let i = 0; i < countriesTableCells.length - totalColumns; i += 1) {
		const cell = countriesTableCells[i];
		// get country
		if (i % totalColumns === countryColIndex) {
			const country = getCountryData(cell);
			const countryData = countryUtils.getCountryData(country);
			if (countryData) { delete countryData.country; }
			result.push({ country, countryInfo: countryData });
		}
		// get cases
		if (i % totalColumns === casesColIndex) {
			result[result.length - 1].cases = getCellData(cell);
		}
		// get today cases
		if (i % totalColumns === newCasesColIndex) {
			result[result.length - 1].todayCases = getCellData(cell);
		}
		// get deaths
		if (i % totalColumns === deathsColIndex) {
			result[result.length - 1].deaths = getCellData(cell);
		}
		// get yesterdays deaths
		if (i % totalColumns === newDeathsColIndex) {
			result[result.length - 1].todayDeaths = getCellData(cell);
		}
		// get cured
		if (i % totalColumns === curedColIndex) {
			result[result.length - 1].recovered = getCellData(cell);
		}
		// get active
		if (i % totalColumns === activeColIndex) {
			result[result.length - 1].active = getCellData(cell);
		}
		// get critical
		if (i % totalColumns === criticalColIndex) {
			result[result.length - 1].critical = getCellData(cell);
		}
		// get total cases per one million population
		if (i % totalColumns === casesPerOneMillionColIndex) {
			const casesPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].casesPerOneMillion = parseFloat(casesPerOneMillion.split(',').join(''));
		}

		// get total deaths per one million population
		if (i % totalColumns === deathsPerOneMillionColIndex) {
			const deathsPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].deathsPerOneMillion = parseFloat(deathsPerOneMillion.split(',').join(''));
			result[result.length - 1].updated = Date.now();
		}
	}
	return result;
}

const getCountries = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus/');
		if (response.status !== 200) {
			console.log('Error', response.status);
		}
	} catch (err) {
		return null;
	}
	// get HTML and parse death rates
	const html = cheerio.load(response.data);
	const result = fillResult(html);
	const string = JSON.stringify(result);
	redis.set(keys.countries, string);
	return console.log(`Updated countries statistics: ${result.length}`);
};

const getYesterday = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus/#nav-yesterday');
		if (response.status !== 200) {
			console.log('Error', response.status);
		}
	} catch (err) {
		return null;
	}
	// get HTML and parse death rates
	const html = cheerio.load(response.data);
	const result = fillResult(html, true);
	const string = JSON.stringify(result);
	redis.set(keys.yesterday, string);
	return console.log(`Updated yesterdays statistics: ${result.length}`);
};

module.exports = {
	getCountries,
	getYesterday
};
