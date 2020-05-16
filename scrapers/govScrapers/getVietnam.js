const axios = require('axios');
const cherrio = require('cheerio');
const rootCas = require('ssl-root-cas').create();
const https = require('https');
const { resolve } = require('path');
const logger = require('../../utils/logger');
const slugify = require('slugify');
rootCas.addFile(resolve(__dirname, '..', 'govScrapers', 'credentials', 'vietnam.pem'));
const httpsAgent = new https.Agent({ ca: rootCas });
const columns = ['City', 'Cases', 'BeintgTreated', 'Recovered', 'Deaths'];
const vietnamData = async () => {
	try {
		const html = cherrio.load((await axios.get('https://ncov.moh.gov.vn/', { httpsAgent })).data);
		return html('table#sailorTable').children('tbody:first-of-type').children('tr').map(maprows).get().filter(el => !el.City.startsWith('BN'));
	} catch (err) {
		logger.err('Error: Requesting Vietnam Gov Data failed!', err);
		return null;
	}
};

const maprows = (_, row) => {
	const city = { updated: Date.now() };
	cherrio(row).children('td').each((index, cell) => {
		cell = cherrio.load(cell);
		switch (index) {
			case 0: {
				city[columns[index]] = slugify(cell.text(), { locale: 'vi' });
				break;
			}
			default: {
				city[columns[index]] = parseInt(cell.text().replace(/\./g, ''));
				break;
			}
		}
	});
	return city;
};
module.exports = vietnamData;
