const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../utils/logger');

const parseStateCell = (cell) => {
	let state = cell.children[0].data
		|| cell.children[0].children[0].data
		// state name with link has another level
		|| cell.children[0].children[0].children[0].data
		|| cell.children[0].children[0].children[0].children[0].data
		|| '';
	state = state.trim();
	if (state.length === 0) {
		state = cell.children[0].next.children[0].data || '';
	}
	return state.trim() || '';
};

const parseNumberCell = (cell) => {
	const cellValue = cell.children.length !== 0 ? cell.children[0].data : '';
	return parseFloat(cellValue.replace(/[,+\-\s]/g, '')) || 0;
};

const fillResult = (html, yesterday = false) => {
	const statesTable = html(yesterday ? 'table#usa_table_countries_yesterday' : 'table#usa_table_countries_today');
	const tableRows = statesTable
		.children('tbody')
		.children('tr:not(.total_row)').toArray();
	// NOTE: this will change when table format change in website
	const stateColIndex = 0;
	const dataColIndexes = {
		cases: 1,
		todayCases: 2,
		deaths: 3,
		todayDeaths: 4,
		active: 5,
		tests: 8,
		testsPerOneMillion: 9
	};

	return tableRows.map((row) => {
		const cells = row.children.filter((cell) => cell.name === 'td');
		const stateData = { state: parseStateCell(cells[stateColIndex]) };
		Object.keys(dataColIndexes).forEach((property) => {
			stateData[property] = parseNumberCell(cells[dataColIndexes[property]]);
		});
		return stateData;
	});
};

const getStates = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus/country/us/');
	} catch (err) {
		logger.httpErrorLogger(err, 'error in getState REQUEST');
		return null;
	}
	const html = cheerio.load(response.data);

	// set states
	const statesData = fillResult(html);
	redis.set(keys.states, JSON.stringify(statesData));
	console.log(`Updated states: ${statesData.length} states`);

	// set yesterday states
	const statesDataYesterday = fillResult(html, true);
	redis.set(keys.yesterday_states, JSON.stringify(statesDataYesterday));
	return console.log(`Updated yesterday states: ${statesDataYesterday.length} states`);
};

module.exports = getStates;
