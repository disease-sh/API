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
			todayCases: parseInt(province.numtoday) || null,
			todayTests: parseInt(province.numtestedtoday) || null,
			todayRecovered: parseInt(province.numrecoveredtoday) || null,
			todayDeaths: parseInt(province.numdeathstoday) || null,
			cases: parseInt(province.numconf) || null,
			active: parseInt(province.numactive) || null,
			tests: parseInt(province.numtested) || null,
			recovered: parseInt(province.numrecover) || null,
			deaths: parseInt(province.numdeaths) || null
		}));
	} catch (err) {
		logger.err('Error: Requesting Canada Gov Data failed!', err);
		return null;
	}
};

module.exports = canadaData;
