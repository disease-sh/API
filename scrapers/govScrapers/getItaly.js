const axios = require('axios');
const logger = require('../../utils/logger');
const csvUtils = require('../../utils/csvUtils');

const url = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv';

const italyData = async () => {
	let italyResponse;
	try {
		italyResponse = await axios.get(url);
		const parsedItalyData = await csvUtils.parseCsvData(italyResponse.data);
		console.log(parsedItalyData);
		return parsedItalyData;
	} catch (err) {
		logger.err(err, 'Error: Requesting Italy Gov Data failed!');
		return null;
	}
};

module.exports = italyData;
