const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');

const columns = ['state', 'cases', 'active', 'recovered', 'deaths'];
/**
 * Return object reflecting a row of data from Nigerian government site
 * @param 	{number} 	_ 		Index getting passed when using .map()
 * @param 	{Object} 	row		The row to extract data from
 * @returns {Object}				Data for Nigerian province with cases, active, deaths, recovered
 */
const mapRows = (_, row) => {
	const state = { updated: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				state[columns[index]] = cell.text().replace(/\n/g, '').trim();
				break;
			}
			default: {
				state[columns[index]] = parseInt(cell.text().replace(/,/g, '')) || null;
			}
		}
	});
	return state;
};

/**
 * Scrapes Nigerian government site and fills array of data from table
 */
const nigeriaData = async () => {
	try {
		const stateData = cheerio.load((await axios.get('https://covid19.ncdc.gov.ng/report/')).data);
		return stateData(`#custom1`).children('tbody').children('tr').map(mapRows).get();
	} catch (err) {
		logger.err('Error: Requesting Nigerian Gov Data failed!', err);
		return null;
	}
};

module.exports = nigeriaData;
