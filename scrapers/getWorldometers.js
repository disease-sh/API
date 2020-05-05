const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');
const logger = require('../utils/logger');

const columns = ['cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion', 'tests', 'testsPerOneMillion', 'continent'];

/**
* Extracts continent specific data from a country data object
* @param 	{Object} 	element 	Country Data
* @returns 	{Object} 				Continent Data
*/
const continentMapping = (element) => {
	element.continent = element.country;
	// eslint-disable-next-line no-unused-vars
	const { country, countryInfo, casesPerOneMillion, deathsPerOneMillion, tests, testsPerOneMillion, ...countryData } = element;
	return countryData;
};

/**
* Returns country data list ordered by country name
* @param 	{Array} 	data 	Countries Data
* @returns 	{Array} 			Countries Data Ordered by Country Name
*/
const getOrderByCountryName = (data) => data.sort((a, b) => a.country < b.country ? -1 : 1);

/**
* Maps a row from worldometers to a country
* @param 	{number} 	_ 		Index getting passed when using .map()
* @param 	{Object} 	row		The row to extract data from
* @returns 	{Object} 			Countries Data
*/
const mapRows = (_, row) => {
	const country = { updated: Date.now() };
	const replaceRegex = /(\n|,)/g;
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				const countryInfo = countryUtils.getCountryData(cell.text().replace(replaceRegex, ''));
				country.country = countryInfo.country || cell.text().replace(replaceRegex, '');
				delete countryInfo.country;
				country.countryInfo = countryInfo;
				break;
			}
			case 12:
				country[columns[index - 1]] = cell.text();
				break;

			default:
				country[columns[index - 1]] = parseInt(cell.text().replace(replaceRegex, '')) || 0;
		}
	});
	return country;
};

/**
 * Fills an array full of table data parsed from worldometers
 * @param 	{Object} 	html 			Cheerio HTML object from worldometers site
 * @param 	{string} 	idExtension 	The extension to append to the ID that is used to get the tables (either 'today' or 'yesterday')
 * @returns {Object} 					Object containing countries, continent and world data
 */
function fillResult(html, idExtension) {
	const countriesTable = html(`table#main_table_countries_${idExtension}`);
	const countries = countriesTable.children('tbody:first-of-type').children('tr:not(.row_continent)').map(mapRows).get();
	const continents = countriesTable.children('tbody:first-of-type').children('tr.row_continent').map(mapRows).get().map(continentMapping).filter(data => !!data.continent);
	const world = countries.shift();
	world.tests = countries.map(country => country.tests).reduce((sum, test) => sum + test);
	world.testsPerOneMillion = parseFloat(((1e6 / (1e6 / (world.casesPerOneMillion / world.cases))) * world.tests).toFixed(1));
	return { world, countries, continents };
}

/**
 * Fills redis with countries and yesterday data
 * @param {string} 	keys 	Redis keys
 * @param {Object} 	redis 	Redis instance
 */
const getWorldometerPage = async (keys, redis) => {
	try {
		const html = cheerio.load((await axios.get('https://www.worldometers.info/coronavirus')).data);
		['today', 'yesterday'].forEach(key => {
			const data = fillResult(html, key);
			redis.set(keys[`${key === 'today' ? '' : 'yesterday_'}countries`], JSON.stringify([data.world, ...getOrderByCountryName(data.countries)]));
			logger.info(`Updated ${key} countries statistics: ${data.countries.length + 1}`);
			redis.set(keys[`${key === 'today' ? '' : 'yesterday_'}continents`], JSON.stringify(getOrderByCountryName(data.continents)));
			logger.info(`Updated ${key} continents statistics: ${data.continents.length}`);
		});
	} catch (err) {
		logger.err('Error: Requesting WorldOMeters failed!', err);
	}
};

module.exports = getWorldometerPage;
