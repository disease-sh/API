const axios = require('axios');
const logger = require('../../../utils/logger');

const params = {
	requests: [
		{ id: 0, queryName: 'lastUpdate', single: true, parameters: {} },
		{ id: 5, queryName: 'patientsPerDate', single: false, parameters: {} },
		{ id: 6, queryName: 'deadPatientsPerDate', single: false, parameters: {} },
		{ id: 7, queryName: 'recoveredPerDay', single: false, parameters: {} },
		{ id: 8, queryName: 'testResultsPerDate', single: false, parameters: {} },
		{ id: 12, queryName: 'infectedByAgeAndGenderPublic', single: false, parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
		{ id: 13, queryName: 'isolatedDoctorsAndNurses', single: false, parameters: {} },
		{ id: 15, queryName: 'contagionDataPerCityPublic', single: false, parameters: {} },
		{ id: 16, queryName: 'hospitalStatus', single: false, parameters: {} }
	]
};

/**
 * Parses and cleans rows of data returned from Israeli government API
 * @param 	{Array} 	data 	Set of data pulled from Israeli API with element for each individual query
 * @returns {Object}			Cleaned and parsed data to be displayed in API
 */
const parseData = (data) => {
	const dateRegex = /\d+-\d+-\d+/g;
	const patientsPerDay = data[1].data;
	const deadPatientsPerDay = data[2].data;
	const recoveredPerDay = data[3].data.splice(20, data[3].data.length - 1);
	const testsPerDay = data[4].data.splice(30, data[4].data.length - 1);
	const timeline = patientsPerDay.map((elem, index) => ({
		date: elem.date.match(dateRegex)[0],
		newHospitalized: elem.new_hospitalized,
		hospitalPatients:  elem.Counthospitalized,
		homePationts:  elem.patients_home,
		hotelPationts: elem.patients_hotel,
		totalBeds: elem.total_beds,
		StandardOccupancy: elem.StandardOccupancy,
		newDeaths: deadPatientsPerDay[index].amount,
		newlyRecovered: recoveredPerDay[index].amount,
		newTestsTaken: testsPerDay[index].amount,
		newPositiveTests: testsPerDay[index].positiveAmount,
		activeEasyStatus: elem.CountEasyStatus,
		activeMediumStatus: elem.CountMediumStatus,
		activeCriticalStatus: elem.CountHardStatus,
		onVentilators: elem.CountBreath
	}));
	return {
		updated: new Date(data[0].data.lastUpdate).valueOf(),
		data: {
			sickByAge: data[5].data.map((entry) => {
				const { section, male, female } = entry;
				return { section: `ages ${section} - ${section + 10}`, male, female };
			}),
			missingStaff: {
				verifiedDoctors: data[6].data[0].Verified_Doctors,
				verifiedNurses: data[6].data[0].Verified_Nurses,
				isolatedDoctors: data[6].data[0].isolated_Doctors,
				isolatedNurses: data[6].data[0].isolated_Nurses,
				isolatedOtherSector: data[6].data[0].isolated_Other_Sector
			},
			hospitalData: data[8].data,
			cityData: data[7].data,
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
