const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');

/**
 * Scrapes more granular South African data from Wikipedia (based on Government sources)
 */
const southAfricaData = async () => {
	try {
		const html = cheerio.load(
			(
				await axios.get(
					'https://en.wikipedia.org/wiki/Template:COVID-19_pandemic_data/South_Africa_medical_cases'
				)
			).data
		);

		var data = {
			national: {
				timeline: []
			},
			provinces: [
				{
					name: 'Eastern Cape',
					timeline: []
				},
				{
					name: 'Free State',
					timeline: []
				},
				{
					name: 'Gauteng',
					timeline: []
				},
				{
					name: 'KwaZulu-Natal',
					timeline: []
				},
				{
					name: 'Limpopo',
					timeline: []
				},
				{
					name: 'Mpumalanga',
					timeline: []
				},
				{
					name: 'Northern Cape',
					timeline: []
				},
				{
					name: 'North West',
					timeline: []
				},
				{
					name: 'Western Cape',
					timeline: []
				}
			]
		};

		var tableRows = html(
			"span:contains('COVID-19 confirmed cases in South Africa by province')"
		)
			.closest('table')
			.find('tr');

		tableRows.slice(2, tableRows.length - 2).each((i, tr) => {
			var tds = html(tr).children();
			var date = `2020-${tds.eq(0).text()}`.replace(/\n/g, '');

			data.national.timeline.push({
				date: date,
				cases: {
					cumulative: parseInt(tds.eq(15).text().replace(/\n|\D/g, '')) || null,
					unallocated:
            parseInt(tds.eq(13).text().replace(/\n|\D/g, '')) || null,
					new: parseInt(tds.eq(14).text().replace(/\n|\D/g, '')) || null
				},
				tests: {
					cumulative: parseInt(tds.eq(3).text().replace(/\n|\D/g, '')) || null
				},
				deaths: {
					cumulative: parseInt(tds.eq(19).text().replace(/\n|\D/g, '')) || null,
					new: parseInt(tds.eq(18).text().replace(/\n|\D/g, '')) || null
				},
				recoveries: {
					cumulative: parseInt(tds.eq(20).text().replace(/\n|\D/g, '')) || null
				}
			});

			data.provinces[0].timeline.push({
				date: date,
				cases: parseInt(tds.eq(4).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[1].timeline.push({
				date: date,
				cases: parseInt(tds.eq(5).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[2].timeline.push({
				date: date,
				cases: parseInt(tds.eq(6).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[3].timeline.push({
				date: date,
				cases: parseInt(tds.eq(7).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[4].timeline.push({
				date: date,
				cases: parseInt(tds.eq(8).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[5].timeline.push({
				date: date,
				cases: parseInt(tds.eq(9).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[6].timeline.push({
				date: date,
				cases: parseInt(tds.eq(10).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[7].timeline.push({
				date: date,
				cases: parseInt(tds.eq(11).text().replace(/\n|\D/g, '')) || null
			});
			data.provinces[8].timeline.push({
				date: date,
				cases: parseInt(tds.eq(12).text().replace(/\n|\D/g, '')) || null
			});
		});

		data.updated = Date.now();
		return data;
	} catch (err) {
		logger.err('Error: Requesting South African gov data failed!', err);
		return null;
	}
};

module.exports = southAfricaData;
