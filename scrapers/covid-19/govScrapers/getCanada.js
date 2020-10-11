const axios = require('axios');
const logger = require('../../../utils/logger');
const csvUtils = require('../../../utils/csvUtils');

/**
 * Return array of provinces that match today's date (initial csv is historical)
 * @param 	{Object} 	csv		The row to extract data from
 * @returns {Array}				Data for canadian province
 */
// eslint-disable-next-line no-unused-vars
const filterByDate = (csv) => {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return csv.filter(row => row.date === `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`);
};

/**
 * Requests and parses csv data that is used to populate the data table on the Canadian government site
 */
const canadaData = async () => {
	try {
		const canadaRes = (await axios.get('https://health-infobase.canada.ca/src/data/covidLive/covid19.csv')).data;
		const parsedCanadaData = await csvUtils.parseCsvData(canadaRes);
		return parsedCanadaData.map(province => ({
			updated: Date.now(),
			province: province.prname === 'Canada' ? 'Total' : province.prname,
			date: province.date,
			todayCases: parseInt(province.numtoday) || 0,
			todayTests: parseInt(province.numtestedtoday) || 0,
			todayRecovered: parseInt(province.numrecoveredtoday) || 0,
			todayDeaths: parseInt(province.numdeathstoday) || 0,
			cases: parseInt(province.numconf) || 0,
			active: parseInt(province.numactive) || 0,
			tests: parseInt(province.numtested) || 0,
			recovered: parseInt(province.numrecover) || 0,
			deaths: parseInt(province.numdeaths) || 0
		}));
	} catch (err) {
		logger.err('Error: Requesting Canada Gov Data failed!', err);
		return null;
	}
};

module.exports = canadaData;
