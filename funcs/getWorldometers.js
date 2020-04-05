const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');

/**
 * Gets country data from table cell on worldometers website
 * @param 	{Object} 	cell 	Country table cell from worldometers website
 * @returns {string} 			Country name
 */
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

/**
 * Gets integer parsed stat from table cell
 * @param 	{Object} 	cell 	Table cell from worldometers website
 * @returns {number} 			Number from cell for statistic
 */
function getCellData(cell) {
	const data = cell.children.length !== 0 ? cell.children[0].data : '';
	return parseInt(
		data.trim().replace(/,/g, '') || '0',
		10
	);
}

/**
 * Fills an array full of table data parsed from worldometers
 * @param 	{Object} 	html 		Cheerio HTML object from worldometers site
 * @param 	{boolean} 	yesterday 	Default false, tells the function which URL to use data from
 * @returns {array} 				Array of objects containing table data from worldometers
 */
function fillResult(html, yesterday = false) {
	// to store parsed data
	const result = [];
	// NOTE: this will change when table format change in website
	const totalColumns = 12;
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
	const testsColIndex = 10;
	const testsPerOneMillionColIndex = 11;

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
			const countryData = countryUtils.getCountryData(getCountryData(cell));
			// eslint-disable-next-line prefer-destructuring
			const country = countryData.country ? countryData.country : getCountryData(cell);
			delete countryData.country;
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
		}

		// get tests
		if (i % totalColumns === testsColIndex) {
			result[result.length - 1].tests = getCellData(cell);
		}

		// get total tests per one million population
		if (i % totalColumns === testsPerOneMillionColIndex) {
			const testsPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '0';
			result[result.length - 1].testsPerOneMillion = parseFloat(testsPerOneMillion.split(',').join(''));
		}
		result[result.length - 1].updated = Date.now();
	}
	return result;
}

/**
 * Fills redis with countries and yesterday data
 * @param {string} keys Redis keys
 * @param {Object} redis Redis instance
 */
const getWorldometerPage = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus');
		if (response.status !== 200) {
			console.log('Error', response.status);
		}
	} catch (err) {
		return null;
	}
	// get HTML and parse death rates
	const html = cheerio.load(response.data);
	// Getting country data from today
	const resultToday = fillResult(html);
	const stringToday = JSON.stringify(resultToday);
	redis.set(keys.countries, stringToday);
	console.log(`Updated countries statistics: ${resultToday.length}`);
	// Getting country data from yesterday
	const resultYesterday = fillResult(html, true);
	const stringYesterday = JSON.stringify(resultYesterday);
	redis.set(keys.yesterday, stringYesterday);
	return console.log(`Updated yesterdays statistics: ${resultYesterday.length}`);
};

module.exports = {
	getWorldometerPage
};
