const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');
const logger = require('../utils/logger');

/**
* Gets country data ordered by country name
* @param 	{Array} 	data 	Countries Data
* @returns {Array} 			Countries Data Ordered by Country Name
*/
const getOrderByCountryName = (data) => data.sort((a, b) => a.country < b.country ? -1 : 1);

/**
 * Fills an array full of table data parsed from worldometers
 * @param 	{Object} 	html 		Cheerio HTML object from worldometers site
 * @param 	{boolean} 	yesterday 	Default false, tells the function which URL to use data from
 * @returns {array} 				Array of objects containing table data from worldometers
 */
function fillResult(html, yesterday = false) {
	// to store parsed data
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

	const countriesTable = html(`table#main_table_countries_${yesterday ? 'yesterday' : 'today'}`);
	const totalColumns = html('table#main_table_countries_today th').length;
	const countriesData = countriesTable.children('tbody:first-of-type').children('tr:not(.row_continent)').map((index, row) => {
		const cells = cheerio(row).children('td');
		const country = { updated: Date.now() };
		for (const cellIndex in cells) {
			const cell = cheerio.load(cells[cellIndex]);
			switch (cellIndex % totalColumns) {
				// get country
				case countryColIndex: {
					const countryInfo = countryUtils.getCountryData(cell.text().replace(/(\n|,)/g, ''));
					// eslint-disable-next-line prefer-destructuring
					country.country = countryInfo.country || cell.text().replace(/(\n|,)/g, '');
					delete countryInfo.country;
					country.countryInfo = countryInfo;
					break;
				}
				// get cases
				case casesColIndex:
					country.cases = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get today cases
				case newCasesColIndex:
					country.todayCases = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get deaths
				case deathsColIndex:
					country.deaths = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get today deaths
				case newDeathsColIndex:
					country.todayDeaths = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get cured
				case curedColIndex:
					country.recovered = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get active
				case activeColIndex:
					country.active = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get critical
				case criticalColIndex:
					country.critical = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get total cases per one million population
				case casesPerOneMillionColIndex:
					country.casesPerOneMillion = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get total deaths per one million population
				case deathsPerOneMillionColIndex:
					country.deathsPerOneMillion = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get tests
				case testsColIndex:
					country.tests = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
				// get total tests per one million population
				case testsPerOneMillionColIndex:
					country.testsPerOneMillion = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
					break;
			}
		}
		return country;
	}).get();
	const world = countriesData.find(country => country.country.toLowerCase() === 'world');
	world.tests = countriesData.map(country => country.tests).splice(1).reduce((sum, test) => sum + test);
	world.testsPerOneMillion = parseFloat(((1e6 / (1e6 / (world.casesPerOneMillion / world.cases))) * world.tests).toFixed(1));
	return countriesData;
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
	} catch (err) {
		logger.httpErrorLogger(err, 'error in getWorldometers REQUEST');
		return null;
	}
	// get HTML and parse death rates
	const html = cheerio.load(response.data);

	// Getting country data from today
	let countriesToday = fillResult(html);
	const worldToday = countriesToday[0];
	countriesToday = getOrderByCountryName(countriesToday.splice(1));
	countriesToday.unshift(worldToday);
	redis.set(keys.countries, JSON.stringify(countriesToday));
	console.log(`Updated countries statistics: ${countriesToday.length}`);

	// Getting country data from yesterday
	let countriesYesterday = fillResult(html, true);
	const worldYesterday = countriesYesterday[0];
	countriesYesterday = getOrderByCountryName(countriesYesterday.splice(1));
	countriesYesterday.unshift(worldYesterday);
	redis.set(keys.yesterday, JSON.stringify(countriesYesterday));
	return console.log(`Updated yesterdays statistics: ${countriesYesterday.length}`);
};

module.exports = getWorldometerPage;
