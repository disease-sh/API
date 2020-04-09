const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');

/**
 * Gets country data from table cell on worldometers website
 * @param 	{Object} 	cell 	Country table cell from worldometers website
 * @returns {string} 			Country name
 */
const getCountryData = (cell) => (cell.children[0].data || cell.children[0].children[0].data || cell.children[0].children[0].children[0].data 
	|| cell.children[0].children[0].children[0].children[0].data || (cell.children[0].next.children[0] && cell.children[0].next.children[0].data || '')).trim();

/**
 * Gets integer parsed stat from table cell
 * @param 	{Object} 	cell 	Table cell from worldometers website
 * @returns {number} 			Number from cell for statistic
 */
const getCellData= (cell) => parseInt(cell.children.length !== 0 ? cell.children[0].data : ''.trim().replace(/,/g, '') || '0', 10);


/**
 * Fills an array full of table data parsed from worldometers
 * @param 	{Object} 	html 		Cheerio HTML object from worldometers site
 * @param 	{boolean} 	yesterday 	Default false, tells the function which URL to use data from
 * @returns {array} 				Array of objects containing table data from worldometers
 */
function fillResult(html, yesterday = false) {
	// to store parsed data
	const result = [];
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
	
	const countriesTable = html(yesterday ? 'table#main_table_countries_yesterday' : 'table#main_table_countries_today');
	const totalColumns = countriesTable.children('tbody:first-of-type').children('tr:first-of-type').children('td').length;
	const countriesTableCells = countriesTable.children('tbody:first-of-type').children('tr').children('td');

	// minus totalColumns to skip last row, which is total
	for (let i = 0; i < countriesTableCells.length - totalColumns; i++) {
		const cell = countriesTableCells[i];
		switch (i % totalColumns) {
			// get country
			case countryColIndex: {
				const countryInfo = countryUtils.getCountryData(getCountryData(cell));
				// eslint-disable-next-line prefer-destructuring
				const country = countryInfo.country || getCountryData(cell);
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
			case casesPerOneMillionColIndex: 
				result[result.length - 1].casesPerOneMillion = getCellData(cell);
				break;

			// get total deaths per one million population
			case deathsPerOneMillionColIndex: 
				result[result.length - 1].deathsPerOneMillion = getCellData(cell);
				break;

			// get tests
			case testsColIndex:
				result[result.length - 1].tests = getCellData(cell);
				break;

			// get total tests per one million population
			case testsPerOneMillionColIndex:
				result[result.length - 1].testsPerOneMillion = getCellData(cell);
				break;
		}
		result[result.length - 1].updated = Date.now();
	}
	const world = result.find(country => country.country.toLowerCase() === 'world');
	world.tests = result.map(country => country.tests).splice(1).reduce((sum, test) => sum + test);
	world.testsPerOneMillion = parseFloat(((1e6 / (1e6 / (world.casesPerOneMillion / world.cases))) * world.tests).toFixed(1));
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
	} catch (err) {
		console.log({
			message: 'error in getWorldometers REQUEST',
			errno: err.errno,
			url: err.config.url
		});
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
