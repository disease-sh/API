const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');

const columns = ['number', 'state', 'active', 'recovered', 'deaths', 'total'];

/**
 * Return object reflecting a row of data from India government site
 * @param 	{number} 	_ 		Index getting passed when using .map()
 * @param 	{Object} 	row		The row to extract data from
 * @returns {Object}				Data for India province with entries for each column in @constant columns
 */
const mapRows = (_, row) => {
	const state = { };
	const flag = cheerio(row).children('td').length === 4;
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		if (flag) {
			index += 1;
		}
		switch (index) {
			case 1: {
				state[columns[index]] = cell.text().trim().startsWith('Total') ? 'Total' : cell.text().trim();
				break;
			}
			default: {
				state[columns[index]] = parseInt(cell.text().trim()) || null;
			}
		}
	});
	state.active = state.cases - state.recovered - state.deaths;
	delete state.number;
	return state;
};

/**
 * Scrapes India government site and fills array of data from table
 */
const indiaData = async () => {
	try {
		const html = cheerio.load((await axios.get('https://www.mohfw.gov.in/')).data);
		const states = html('#state-data .table > tbody > tr').map(mapRows).get().filter(state => state.state);
		const total = states.splice(-1, 1)[0];
		delete total.state;
		return {
			updated: Date.now(),
			total,
			states
		};
	} catch (err) {
		logger.err('Error: Requesting India Gov Data failed!', err);
		return null;
	}
};

module.exports = indiaData;
