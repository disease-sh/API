const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');

const columns = ['province', 'active', 'recovered', 'deaths', 'cases', '_'];

/**
 * Return object reflecting a row of data from New Zealand government site
 * @param 	{number} 	_ 		Index getting passed when using .map()
 * @param 	{Object} 	row		The row to extract data from
 * @returns {Object}			Data for New Zealand province with entries for each column in @constant columns
 */
const mapRows = (_, row) => {
	const province = { };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				province[columns[index]] = cell.text();
				break;
			}
			case 5:
				break;
			default: {
				province[columns[index]] = parseInt(cell.text().replace(/,/g, '')) || null;
			}
		}
	});
	return province;
};

/**
 * Scrapes New Zealand government site and fills array of data from table
 */
const newZealandData = async () => {
	try {
		const html = cheerio.load((await axios.get('https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases')).data);
		const provinces = html('table:nth-of-type(3) > tbody > tr').map(mapRows).get();
		return {
			updated: Date.now(),
			provinces
		};
	} catch (err) {
		logger.err('Error: Requesting New Zealand Gov Data failed!', err);
		return null;
	}
};

module.exports = newZealandData;
