const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');

const columns = ['province', 'cases', 'probableCases', 'confirmedAndProbable', 'deaths'];

/**
 * Return object reflecting a row of data from ECDC site
 * @param 	{number} 	_ 		Index getting passed when using .map()
 * @param 	{Object} 	row		The row to extract data from
 * @returns {Object}				Data for African province with entries for each column in @constant columns
 */
const mapRows = (_, row) => {
	const province = { };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				province[columns[index]] = cell.text() === 'Grand Total' ? 'Total' : cell.text();
				break;
			}
			case 3: {
				break;
			}
			default: {
				province[columns[index]] = parseInt(cell.text().replace(/,/g, '')) || null;
			}
		}
	});
	return province;
};

/**
 * Scrapes ECDC site and fills array of data from table
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const ebolaData = async (keys, redis) => {
	try {
		const html = cheerio.load((await axios.get('https://www.ecdc.europa.eu/en/all-topics-z/ebola-and-marburg-fevers/threats-and-outbreaks/ebola-outbreak-DRC-geographical-distribution')).data);
		const provinces = html(`table`).children('tbody:first-of-type').children('tr').map(mapRows).get();
		const data = {
			updated: Date.now(),
			sourceUpdated: html('div.ct__last-update').children('span:nth-of-type(2)').text().replace(/\n/g, ''),
			source: 'European Centre for Disease Prevention and Control (© ECDC [2005-2019].)',
			provinces
		};
		redis.set(keys.ebola, JSON.stringify(data));
		logger.info(`Updated ebola data: ${provinces.length} provinces`);
	} catch (err) {
		logger.err('Error: Requesting Canada Gov Data failed!', err);
	}
};

module.exports = ebolaData;
