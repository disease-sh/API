const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');
const logger = require('../utils/logger');

const columnMapper = ['cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion', 'tests', 'testsPerOneMillion'];

/**
* Gets country data ordered by country name
* @param 	{Array} 	data 	Countries Data
* @returns {Array} 			Countries Data Ordered by Country Name
*/
const getOrderByCountryName = (data) => data.sort((a, b) => a.country < b.country ? -1 : 1);

const mapRows = (index, row) => {
	const country = { updated: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		if (index === 0) {
			const countryInfo = countryUtils.getCountryData(cell.text().replace(/(\n|,)/g, ''));
			country.country = countryInfo.country || cell.text().replace(/(\n|,)/g, '');
			delete countryInfo.country;
			country.countryInfo = countryInfo;
		} else if(columnMapper[index-1]) 
			country[columnMapper[index-1]] = parseInt(cell.text().replace(/(\n|,)/g, '')) || 0;
	});
	return country;
}

/**
 * Fills an array full of table data parsed from worldometers
 * @param 	{Object} 	html 		Cheerio HTML object from worldometers site
 * @param 	{boolean} 	yesterday 	Default false, tells the function which URL to use data from
 * @returns {Object} 	Object containing countries, continent and world data
 */
function fillResult(html, idExtension) {
	const countriesTable = html(`table#main_table_countries_${idExtension}`);
	const countriesData = countriesTable.children('tbody:first-of-type').children('tr:not(.row_continent)').map(mapRows).get();
	const continentData = countriesTable.children('tbody:first-of-type').children('tr.row_continent').map(mapRows).get();
	const world = countriesData.shift();
	world.tests = countriesData.map(country => country.tests).splice(1).reduce((sum, test) => sum + test);
	world.testsPerOneMillion = parseFloat(((1e6 / (1e6 / (world.casesPerOneMillion / world.cases))) * world.tests).toFixed(1));
	return { world, countries: countriesData, continents: continentData};
}

/**
 * Fills redis with countries and yesterday data
 * @param {string} keys Redis keys
 * @param {Object} redis Redis instance
 */
const getWorldometerPage = async (keys, redis) => {
	try {
		const html = cheerio.load((await axios.get('https://www.worldometers.info/coronavirus')).data);
		['today', 'yesterday'].forEach(key => {
			const data = fillResult(html, key);
			redis.set(keys[`${key === 'today'?'':'yesterday_'}countries`], JSON.stringify([data.world, ...getOrderByCountryName(data.countries)]));
			console.log(`Updated ${key} countries statistics: ${data.countries.length+1}`);
			redis.set(keys[`${key === 'today'?'':'yesterday_'}continents`], JSON.stringify(getOrderByCountryName(data.countries)));
			console.log(`Updated ${key} continents statistics: ${data.continents.length}`);
		});
	} catch (err) {
		console.log(err)
		logger.httpErrorLogger(err, 'error in getWorldometers REQUEST');
		return null;
	}
};

module.exports = getWorldometerPage;
