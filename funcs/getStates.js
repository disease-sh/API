const axios = require('axios');
const cheerio = require('cheerio');

const parseStateCell = (cell) => {
	let state = cell.children[0].data
		|| cell.children[0].children[0].data
		// state name with link has another level
		|| cell.children[0].children[0].children[0].data
		|| cell.children[0].children[0].children[0].children[0].data
		|| '';
	state = state.trim();
	if (state.length === 0) {
		// parse with hyperlink
		state = cell.children[0].next.children[0].data || '';
	}
	return state.trim() || '';
};

const parseNumberCell = (cell) => {
	const cellValue = cell.children.length !== 0 ? cell.children[0].data : '';
	return parseFloat(cellValue.replace(/[,+\-\s]/g, ''), 10) || 0;
};

const getStates = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus/country/us/');
		if (response.status !== 200) {
			console.log('Error', response.status);
		}
	} catch (err) {
		console.log(err);
		return null;
	}
	// to store parsed data
	const result = [];
	// get HTML and parse death rates
	const html = cheerio.load(response.data);
	const statesTable = html('table#usa_table_countries_today');
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
		active: 5
	};

	tableRows.forEach((row) => {
		const cells = row.children.filter((cell) => cell.name === 'td');
		const stateData = { state: parseStateCell(cells[stateColIndex]) };
		Object.keys(dataColIndexes).forEach((property) => {
			stateData[property] = parseNumberCell(cells[dataColIndexes[property]]);
		});
		result.push(stateData);
	});

	const string = JSON.stringify(result);
	redis.set(keys.states, string);
	return console.log(`Updated states: ${result.length} states`);
};

module.exports = getStates;
