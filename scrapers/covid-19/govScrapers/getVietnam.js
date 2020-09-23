const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');

const mapRows = (_, row) => {
	const columns = ['_', '_', '_', 'location', 'status'];
	const city = {};
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 3:
			case 4:
				city[columns[index]] = cell.text();
				break;
		}
	});
	return city;
};

const processRow = (json) => {
	const city = [];
	const cityList = [...new Set(json.map(tmp => tmp.location))];
	cityList.forEach(ct => {
		const check = json.filter(el => el.location === ct);
		city.push({
			updated: Date.now(),
			city: ct,
			cases: check.length,
			beingTreated: check.filter(el => el.status === 'Đang điều trị').length,
			recovered: check.filter(el => el.status === 'Khỏi').length,
			deaths: check.filter(el => el.status === 'Tử vong').length
		});
	});
	return city;
};
/**
 * Scrapes Vietnam government site and fills array of data from table
 */
const vietnamData = async () => {
	try {
		const html = cheerio.load((await axios.default({ method: 'GET', url: 'http://ncov.moh.gov.vn/', httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) })).data);
		return processRow(html('table#sailorTable').children('tbody:first-of-type').children('tr').map(mapRows).get());
	} catch (err) {
		logger.err('Error: Requesting Vietnam Gov Data failed!', err);
		return null;
	}
};

module.exports = vietnamData;
