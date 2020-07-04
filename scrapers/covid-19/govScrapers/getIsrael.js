const axios = require('axios');
const logger = require('../../../utils/logger');

const params = {
	requests: [
		{ id: 0, queryName: 'lastUpdate', single: true, parameters: {} },
		{ id: 4, queryName: 'sickPerLocation', single: false, parameters: {} },
		{ id: 5, queryName: 'patientsPerDate', single: false, parameters: {} },
		{ id: 6, queryName: 'deadPatientsPerDate', single: false, parameters: {} },
		{ id: 7, queryName: 'recoveredPerDay', single: false, parameters: {} },
		{ id: 8, queryName: 'testResultsPerDate', single: false, parameters: {} },
		{ id: 12, queryName: 'infectedByAgeAndGenderPublic', single: false, parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
		{ id: 15, queryName: 'contagionDataPerCityPublic', single: false, parameters: {} }
	]
};

/**
 * Parses and cleans rows of data returned from Israeli government API
 * @param 	{Array} 	data 	Set of data pulled from Israeli API with element for each individual query
 * @returns {Object}			Cleaned and parsed data to be displayed in API
 */
const parseData = (data) => {
	const dateRegex = /\d+-\d+-\d+/g;
	const patientsPerDay = data[2].data;
	const deadPatientsPerDay = data[3].data;
	const recoveredPerDay = data[4].data.splice(20, data[4].data.length - 1);
	const testsPerDay = data[5].data.splice(30, data[5].data.length - 1);
	const timeline = patientsPerDay.map((elem, index) => ({
		date: elem.date.match(dateRegex)[0],
		newHospitalized: elem.new_hospitalized,
		totalhospitalized: elem.Counthospitalized,
		totalBeds: elem.total_beds,
		StandardOccupancy: elem.StandardOccupancy,
		newDeaths: deadPatientsPerDay[index].amount,
		newlyRecovered: recoveredPerDay[index].amount,
		newTestsTaken: testsPerDay[index].amount,
		newPositiveTests: testsPerDay[index].positiveAmount
	}));
	return {
		updated: new Date(data[0].data.lastUpdate).valueOf(),
		data: {
			sickLocated: { home: data[1].data[0].amount, hospital: data[1].data[1].amount },
			sickByAge: data[6].data.map((entry) => {
				const { section, male, female } = entry;
				return { section: `ages ${section} - ${section + 10}`, male, female };
			}),
			cityData: data[7].data.map((entry) => delete entry.status && entry),
			timeline
		}
	};
};

/**
 * Scrapes Israeli government site and fills array of data from table
 */
const israelData = async () => {
	try {
		const data = await axios.post('https://datadashboardapi.health.gov.il/api/queries/_batch', params, {
			headers: { 'Content-Type': 'application/json' }
		});
		return parseData(data.data);
	} catch (err) {
		logger.err('Error: Requesting Israel Gov Data failed!', err);
		return null;
	}
};

module.exports = israelData;
