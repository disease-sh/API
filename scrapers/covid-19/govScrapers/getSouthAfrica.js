const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');

/**
 * Scrapes more granular South African data from Wikipedia (based on Government sources)
 */
const southAfricaData = async () => {
	try {
		const html = cheerio.load((await axios.get('https://en.wikipedia.org/wiki/Template:COVID-19_pandemic_data/South_Africa_medical_cases')).data);
		const data = {
			national: { timeline: [] },
			provinces: ['Eastern Cape', 'Free state', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape']
				.map(name => ({ name, timeline: [] }))
		};

		const tableRows = html("span:contains('COVID-19 confirmed cases in South Africa by province')").closest('table').find('tr');
		tableRows.slice(2, tableRows.length - 2).each((i, tr) => {
			const tds = html(tr).children();
			const date = `2020-${tds.eq(0).text()}`.replace(/\n/g, '');
			data.national.timeline.push({
				date: date,
				cases: { cumulative: getCellData(tds, 15), unallocated: getCellData(tds, 13), new: getCellData(tds, 14) },
				tests: { cumulative: getCellData(tds, 3) },
				deaths: { cumulative: getCellData(tds, 19), new: getCellData(tds, 18) },
				recoveries: { cumulative: getCellData(tds, 20) }
			});

			data.provinces.forEach((prov, index) => {
				prov.timeline.push({ date: date, cases: getCellData(tds, index + 4) });
			});
		});
		data.updated = Date.now();
		return data;
	} catch (err) {
		logger.err('Error: Requesting South African gov data failed!', err);
		return null;
	}
};

function getCellData(tds, index) {
	return parseInt(tds.eq(index).text().replace(/\n|\D/g, '')) || null;
}
module.exports = southAfricaData;
