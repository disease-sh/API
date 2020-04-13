const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');
const logger = require('../utils/logger');

/**
 * Gets country data from table cell on worldometers website
 * @param 	{Object} 	cell 	Country table cell from worldometers website
 * @returns {string} 			Country name
 */
const getCountryData = (cell) => (cell.children[0].data || cell.children[0].children[0].data || cell.children[0].children[0].children[0].data
	|| cell.children[0].children[0].children[0].children[0].data || (cell.children[0].next.children[0] && cell.children[0].next.children[0].data) || '').trim();

/**
* Gets data ordered by name
* @param 	{Array} 	data  Data
* @returns {Array} 			Countries Data Ordered by Name
*/
const getOrderByName = (data) => data.sort((a, b) => (a.country || a.continent) < (b.country || b.continent) ? -1 : 1);

/**
 * Gets integer parsed stat from table cell
 * @param 	{Object} 	cell 	Table cell from worldometers website
 * @returns {number} 			Number from cell for statistic
 */
const getCellData = (cell) => parseInt((cell.children.length !== 0 ? cell.children[0].data : '').trim().replace(/,/g, '') || '0', 10);
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

	const countriesTable = html(yesterday ? 'table#main_table_countries_yesterday' : 'table#main_table_countries_today');
	const totalColumns = html('table#main_table_countries_today th').length;
	const countriesRows = countriesTable.children('tbody:first-of-type').children('tr:not(.row_continent)');
	const continentRows = countriesTable.children('tbody:first-of-type').children('tr.row_continent:not(.last-of-type)');
	// eslint-disable-next-line complexity
	const mapRows = (index, row, continents = false) => {
		const cells = cheerio(row).children('td');
		const country = { updated: Date.now() };
		for (const cellIndex in cells) {
			const cell = cells[cellIndex];
			switch (cellIndex % totalColumns) {
				// get country
				case countryColIndex: {
					if (continents) {
						country.continent = cheerio.load(cell).text().replace(/\n/g, '');
					} else {
						const countryInfo = countryUtils.getCountryData(getCountryData(cell));
						// eslint-disable-next-line prefer-destructuring
						country.country = countryInfo.country || getCountryData(cell);
						delete countryInfo.country;
						country.countryInfo = countryInfo;
					}
					break;
				}
				// get cases
				case casesColIndex:
					country.cases = getCellData(cell) || 0;
					break;
				// get today cases
				case newCasesColIndex:
					country.todayCases = getCellData(cell) || 0;
					break;
				// get deaths
				case deathsColIndex:
					country.deaths = getCellData(cell) || 0;
					break;
				// get today deaths
				case newDeathsColIndex:
					country.todayDeaths = getCellData(cell) || 0;
					break;
				// get cured
				case curedColIndex:
					country.recovered = getCellData(cell) || 0;
					break;
				// get active
				case activeColIndex:
					country.active = getCellData(cell) || 0;
					break;
				// get critical
				case criticalColIndex:
					country.critical = getCellData(cell) || 0;
					break;
				// get total cases per one million population
				case casesPerOneMillionColIndex:
					if (!continents) country.casesPerOneMillion = getCellData(cell) || 0;
					break;
				// get total deaths per one million population
				case deathsPerOneMillionColIndex:
					if (!continents) country.deathsPerOneMillion = getCellData(cell) || 0;
					break;
				// get tests
				case testsColIndex:
					if (!continents) country.tests = getCellData(cell) || 0;
					break;
				// get total tests per one million population
				case testsPerOneMillionColIndex:
					if (!continents) country.testsPerOneMillion = getCellData(cell) || 0;
					break;
			}
		}
		return country;
	};
	const mapContinentRows = (index, row) => mapRows(index, row, true);
	const countriesData = countriesRows.map(mapRows).get();
	const continentData = continentRows.map(mapContinentRows).get().filter(continent => continent.continent);
	const world = countriesData.find(country => country.country.toLowerCase() === 'world');
	world.tests = countriesData.map(country => country.tests).splice(1).reduce((sum, test) => sum + test);
	world.testsPerOneMillion = parseFloat(((1e6 / (1e6 / (world.casesPerOneMillion / world.cases))) * world.tests).toFixed(1));
	return [...continentData, ...countriesData];
}

/**
 * Fills redis with todays and yesterdays country/continent data
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

	// Getting country/continent data from today
	let countriesToday = fillResult(html);
	const worldAndContinentsToday = countriesToday.slice(0, 7);
	countriesToday = [...getOrderByName(worldAndContinentsToday), ...getOrderByName(countriesToday.splice(7))];
	redis.set(keys.countries, JSON.stringify(countriesToday));
	console.log(`Updated countries/continents statistics: ${countriesToday.length - 7} countries & ${worldAndContinentsToday.length - 1} continents`);

	// Getting country/continent data from yesterday
	let countriesYesterday = fillResult(html, true);
	const worldAndContinentsYesterday = countriesYesterday.slice(0, 7);
	countriesYesterday = [...getOrderByName(worldAndContinentsYesterday), ...getOrderByName(countriesYesterday.splice(7))];
	redis.set(keys.yesterday, JSON.stringify(countriesYesterday));
	return console.log(`Updated yesterdays countries/continents statistics: ${countriesYesterday.length - 7} countries & ${worldAndContinentsYesterday.length - 1} continents`);
};

module.exports = getWorldometerPage;
