const csv = require('csvtojson');

/**
 * Parses csv file to program readable format
 * @param 	{Object}	data	Raw csv data
 * @returns {array}				Array of parsed csv data
 */
async function parseCsvData(data) {
	const parsedData = await csv({
		noheader: false,
		output: 'json'
	}).fromString(data);
	return parsedData;
}

module.exports = {
	parseCsvData
};

