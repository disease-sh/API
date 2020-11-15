const axios = require('axios');
const cheerio = require('cheerio');
const nameUtils = require('../../utils/nameUtils');
const logger = require('../../utils/logger');

const columns = ['index', 'country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'todayRecovered', 'active',
	'critical', 'casesPerOneMillion', 'deathsPerOneMillion', 'tests', 'testsPerOneMillion', 'population', 'continent', 'oneCasePerPeople', 'oneDeathPerPeople', 'oneTestPerPeople'];

const toPerOneMillion = (population, property) => property && parseFloat((1e6 / population * property).toFixed(2));

/**
* Extracts continent specific data from a country data object
* @param 	{Object} 	element 	Country Data
* @param 	{Object} 	countries 	Country List
* @returns 	{Object} 				Continent Data
*/
const continentMapping = (element, countries) => {
	const continentCountries = countries.filter(country => country.continent === element.continent);
	element.population = continentCountries.map(country => country.population).reduce((sum, pop) => sum + pop);
	element.tests = continentCountries.map(country => country.tests).reduce((sum, tests) => sum + tests);
	element.casesPerOneMillion = toPerOneMillion(element.population, element.cases);
	element.deathsPerOneMillion = toPerOneMillion(element.population, element.deaths);
	element.testsPerOneMillion = toPerOneMillion(element.population, element.tests);
	element.activePerOneMillion = toPerOneMillion(element.population, element.active);
	element.recoveredPerOneMillion = toPerOneMillion(element.population, element.recovered);
	element.criticalPerOneMillion = toPerOneMillion(element.population, element.critical);
	// eslint-disable-next-line no-unused-vars
	const { country, countryInfo, oneCasePerPeople, oneDeathPerPeople, oneTestPerPeople, ...continentData } = element;
	return continentData;
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
	const entry = { updated: Date.now() };
	const replaceRegex = /(\n|,)/g;
	cheerio(row).children('td').each((index, cell) => {
		const selector = columns[index];
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				break;
			}
			case 1: {
				const countryInfo = nameUtils.getCountryData(cell.text().replace(replaceRegex, ''));
				entry[selector] = countryInfo.country || cell.text().replace(replaceRegex, '');
				delete countryInfo.country;
				entry.countryInfo = countryInfo;
				break;
			}
			/*
				Index 15 refers to the following cell:
				`<td style="display:none" data-continent="all"></td>`

				Cheerio loads all columns of the table including those not selected inside the `Column` select element.
			*/
			case 15: {
				entry[selector] = cell.text();
				break;
			}
			default:
				entry[selector] = parseFloat(cell.text().replace(replaceRegex, '')) || null;
		}
	});
	// eslint-disable-next-line no-unused-expressions
	!entry.active && (entry.active = entry.cases - entry.recovered - entry.deaths);
	entry.activePerOneMillion = toPerOneMillion(entry.population, entry.active);
	entry.recoveredPerOneMillion = toPerOneMillion(entry.population, entry.recovered);
	entry.criticalPerOneMillion = toPerOneMillion(entry.population, entry.critical);
	return entry;
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
	const continents = countriesTable.children('tbody:first-of-type').children('tr.row_continent').map(mapRows).get().map(el => continentMapping(el, countries)).filter(data => !!data.continent);
	const world = countries.shift();
	world.population = countries.map(country => country.population).reduce((sum, pop) => sum + pop);
	world.tests = countries.map(country => country.tests).reduce((sum, test) => sum + test);
	world.testsPerOneMillion = toPerOneMillion(world.population, world.tests);
	world.activePerOneMillion = toPerOneMillion(world.population, world.active);
	world.recoveredPerOneMillion = toPerOneMillion(world.population, world.recovered);
	world.criticalPerOneMillion = toPerOneMillion(world.population, world.critical);
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
		['today', 'yesterday', 'yesterday2'].forEach(key => {
			const data = fillResult(html, key);
			redis.set(keys[`${key === 'today' ? '' : key === 'yesterday2' ? 'twoDaysAgo_' : 'yesterday_'}countries`], JSON.stringify([data.world, ...getOrderByCountryName(data.countries)]));
			logger.info(`Updated ${key} countries statistics: ${data.countries.length + 1}`);
			redis.set(keys[`${key === 'today' ? '' : key === 'yesterday2' ? 'twoDaysAgo_' : 'yesterday_'}continents`], JSON.stringify(getOrderByCountryName(data.continents)));
			logger.info(`Updated ${key} continents statistics: ${data.continents.length}`);
		});
	} catch (err) {
		logger.err('Error: Requesting WorldoMeters failed!', err);
	}
};

module.exports = getWorldometerPage;
