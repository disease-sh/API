const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');
const columns = ['_', '_', '_', 'location', 'status', '_'];

const mapRows = (_, row) => {
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
	const ref = {};
	const cityList = json.reduce((arr, cityObject) => {
		// eslint-disable-next-line
		if (ref.hasOwnProperty(cityObject.location))
			arr[ref[cityObject.location]].push(cityObject);
		else {
			ref[cityObject.location] = arr.length;
			arr.push([cityObject]);
		}
		return arr;
	}, []);
	const cityData = cityList.map((arr) => ({
		updated: Date.now(),
		city: arr[0].location,
		cases: arr.length,
		beingTreated: arr.filter(el => el.status === 'Đang điều trị').length,
		recovered: arr.filter(el => el.status === 'Khỏi').length,
		deaths: arr.filter(el => el.status === 'Tử vong').length
	}));

	return cityData;
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
