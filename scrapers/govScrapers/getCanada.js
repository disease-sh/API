const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');

const columns = ['province', 'cases', 'deaths'];

/**
 * Return object reflecting a row of data from Canadian government site
 * @param 	{number} 	_ 		Index getting passed when using .map()
 * @param 	{Object} 	row		The row to extract data from
 * @returns {Object}				Data for canadian province with entries for each column in @constant columns
 */
const mapRows = (_, row) => {
	const province = { updated: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				province[columns[index]] = cell.text() === 'Canada' ? 'Total' : cell.text();
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
 * Scrapes Canadian government site and fills array of data from table
 */
const canadaData = async () => {
	try {
		const html = cheerio.load((await axios.get('https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html')).data);
		return html(`table#dataTable`).children('tbody:first-of-type').children('tr').map(mapRows).get();
	} catch (err) {
		logger.err('Error: Requesting Canada Gov Data failed!', err);
		return null;
	}
};

module.exports = canadaData;
