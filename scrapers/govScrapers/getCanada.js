const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');

const columns = ['province', 'cases', 'probableCases', 'deaths'];

const mapRows = (_, row) => {
	const province = { updated: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				province[columns[index]] = cell.text();
				break;
			}
			default: {
				province[columns[index]] = parseInt(cell.text().replace(/,/g, ''));
			}
		}
	});
	return province;
};

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
