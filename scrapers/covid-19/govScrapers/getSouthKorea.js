const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');
const columns = ['city', 'todayCases', 'importedCasesToday', 'localCasesToday', 'cases', 'isolated', 'recovered', 'deaths', 'incidence'];

const mapRows = (_, row) => {
	const city = { updated: Date.now() };
	cheerio(row).children('th').each((index, cell) => {
		cell = cheerio.load(cell);
		city[columns[index]] = cell.text().trim();
	});
	cheerio(row).children('td').each((index, cell) => {
		index++;
		cell = cheerio.load(cell);
		switch (index) {
			case 8:
				city[columns[index]] = parseFloat(cell.text().trim()) || null;
				break;
			default:
				city[columns[index]] = parseInt(cell.text().trim().replace(',', ''));
				break;
		}
	});
	return city;
};

const sKoreaData = async () => {
	try {
		const res = await axios.default({ method: 'GET', url: 'http://ncov.mohw.go.kr/en/bdBoardList.do?brdId=16&brdGubun=162&dataGubun=&ncvContSeq=&contSeq=&board_id=&gubun=' });
		const html = cheerio.load(res.data);
		return html('table').children('tbody:first-of-type').children('tr').map(mapRows).get().filter(el => el.city !== 'Total');
	} catch (err) {
		logger.err('Error: Requesting South Korea Gov Data failed!', err);
		return null;
	}
};

module.exports = sKoreaData;
