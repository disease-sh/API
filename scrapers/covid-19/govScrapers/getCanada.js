const axios = require('axios');
const logger = require('../../../utils/logger');
const csvUtils = require('../../../utils/csvUtils');
const moment = require('moment');

/**
 * Return array of provinces that match today's date (initial csv is historical)
 * @param 	{Object} 	csv		The row to extract data from
 * @returns {Array}				Data for canadian province
 */
const filterByDate = (csv) => {
	const date = moment().format('DD-MM-YYYY');
	return csv.filter(row => row.date === date);
};

/**
 * Requests and parses csv data that is used to populate the data table on the Canadian government site
 */
const canadaData = async () => {
	try {
		const canadaRes = (await axios.get('https://health-infobase.canada.ca/src/data/covidLive/covid19.csv')).data;
		const parsedCanadaData = await csvUtils.parseCsvData(canadaRes);
		return filterByDate(parsedCanadaData).map(province => ({
			updated: Date.now(),
			province: province.prname === 'Canada' ? 'Total' : province.prname,
			cases: parseInt(province.numconf) || 0,
			deaths: parseInt(province.numdeaths) || 0
		}));
	} catch (err) {
		logger.err('Error: Requesting Canada Gov Data failed!', err);
		return null;
	}
};

module.exports = canadaData;
