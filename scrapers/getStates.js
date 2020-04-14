const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../utils/logger');

/**
 * Get state name from html table cell
 * @param 	{Object} 	cell 	Table cell from states table
 * @returns {string} 			State name
 */
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

/**
 * Gets a data vlue, example cases, from an html table cell
 * @param 	{Object} 	cell 	Table cell from states table
 * @returns {float} 			Value of cell
 */
const parseNumberCell = (cell) => {
	const cellValue = cell.children.length !== 0 ? cell.children[0].data : '';
	return parseFloat(cellValue.replace(/[,+\-\s]/g, '')) || 0;
};

/**
 * Scrapes state table data from worldometers
 * @param 	{Object} 	html 		Html parsed from worldometers
 * @param 	{boolean} 	yesterday 	Indicates whether data should be scraped for yesterday or today
 * @returns {Array} 				Returns array of data for each state with cases, deaths, etc
 */
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

/**
 * Fills redis with states and yesterday_states data
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const getStates = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus/country/us/');
	} catch (err) {
		logger.err('Error: Requesting GetStates failed!', err);
	}
	const html = cheerio.load(response.data);

	// set states
	const statesData = fillResult(html);
	redis.set(keys.states, JSON.stringify(statesData));
	logger.info(`Updated states: ${statesData.length} states`);

	// set yesterday states
	const statesDataYesterday = fillResult(html, true);
	redis.set(keys.yesterday_states, JSON.stringify(statesDataYesterday));
	logger.info(`Updated yesterday states: ${statesDataYesterday.length} states`);
};

module.exports = getStates;
