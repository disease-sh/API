const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');

const columns = ['province', 'cases', 'casePreviousDayChange', 'casesPerHundredThousand', 'sevenDayCasesPerHundredThousand', 'deaths'];

/**
 * Return object reflecting a row of data from German government site
 * @param 	{number} 	_ 		Index getting passed when using .map()
 * @param 	{Object} 	row		The row to extract data from
 * @returns {Object}				Data for German province with entries for each column in @constant columns
 */
const mapRows = (_, row) => {
	const province = { updated: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				province[columns[index]] = cell.text() === 'Gesamt' ? 'Total' : cell.text();
				break;
			}
			case 4: {
				province[columns[index]] = parseFloat(cell.text()) || null;
				break;
			}
			default: {
				province[columns[index]] = parseInt(cell.text().replace(/\./g, '')) || null;
			}
		}
	});
	return province;
};

/**
 * Scrapes German government site and fills array of data from table
 */
const germanyData = async () => {
	try {
		const html = cheerio.load((await axios.get('https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Fallzahlen.html')).data);
		return html(`table`).children('tbody:first-of-type').children('tr').map(mapRows).get();
	} catch (err) {
		logger.err('Error: Requesting Germany Gov Data failed!', err);
		return null;
	}
};

module.exports = germanyData;
