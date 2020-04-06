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
	return parseInt(data.trim().replace(/,/g, '') || '0', 10);
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
		switch (i % totalColumns) {
			// get country
			case countryColIndex: {
				const countryInfo = countryUtils.getCountryData(getCountryData(cell));
				// eslint-disable-next-line prefer-destructuring
				const country = countryInfo.country ? countryInfo.country : getCountryData(cell);
				delete countryInfo.country;
				result.push({ country, countryInfo });
				break;
			}

			// get cases
			case casesColIndex:
				result[result.length - 1].cases = getCellData(cell);
				break;

			// get today cases
			case newCasesColIndex:
				result[result.length - 1].todayCases = getCellData(cell);
				break;

			// get deaths
			case deathsColIndex:
				result[result.length - 1].deaths = getCellData(cell);
				break;

			// get today deaths
			case newDeathsColIndex:
				result[result.length - 1].todayDeaths = getCellData(cell);
				break;

			// get cured
			case curedColIndex:
				result[result.length - 1].recovered = getCellData(cell);
				break;

			// get active
			case activeColIndex:
				result[result.length - 1].active = getCellData(cell);
				break;

			// get critical
			case criticalColIndex:
				result[result.length - 1].critical = getCellData(cell);
				break;

			// get total cases per one million population
			case casesPerOneMillionColIndex: {
				const casesPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '';
				result[result.length - 1].casesPerOneMillion = parseFloat(casesPerOneMillion.split(',').join(''));
				break;
			}

			// get total deaths per one million population
			case deathsPerOneMillionColIndex: {
				const deathsPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '';
				result[result.length - 1].deathsPerOneMillion = parseFloat(deathsPerOneMillion.split(',').join(''));
				break;
			}

			// get tests
			case testsColIndex:
				result[result.length - 1].tests = getCellData(cell);
				break;

			// get total tests per one million population
			case testsPerOneMillionColIndex: {
				const testsPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '0';
				result[result.length - 1].testsPerOneMillion = parseFloat(testsPerOneMillion.split(',').join(''));
				break;
			}
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
	redis.set(keys.countries, JSON.stringify(resultToday));
	console.log(`Updated countries statistics: ${resultToday.length}`);
	// Getting country data from yesterday
	const resultYesterday = fillResult(html, true);
	redis.set(keys.yesterday, JSON.stringify(resultYesterday));
	return console.log(`Updated yesterdays statistics: ${resultYesterday.length}`);
};

module.exports = getWorldometerPage;
