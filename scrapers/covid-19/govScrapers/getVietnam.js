const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');

const columns = ['city', 'cases', 'beingTreated', 'recovered', 'deaths'];

const mapRows = (_, row) => {
	const city = { updated: Date.now() };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				city[columns[index]] = cell.text().trim();
				break;
			}
			default: {
				city[columns[index]] = parseInt(cell.text().replace(/\./g, '')) || null;
				break;
			}
		}
	});
	console.log(city)
	return city;
};

/**
 * Scrapes Vietnam government site and fills array of data from table
 */
const vietnamData = async () => {
	try {
		const html = cheerio.load((await axios.default({ method: 'GET', url: 'http://ncov.moh.gov.vn/', httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })).data);
		return html('.table-responsive:first-of-type tbody:first-of-type').children('tr').map(mapRows).get().filter(el => !el.city.startsWith('BN'));
	} catch (err) {
		logger.err('Error: Requesting Vietnam Gov Data failed!', err);
		return null;
	}
};

module.exports = vietnamData;
