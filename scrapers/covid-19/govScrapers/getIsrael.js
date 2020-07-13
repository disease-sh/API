const axios = require('axios');
const logger = require('../../../utils/logger');

const params = {
	requests: [
		{ queryName: 'lastUpdate', single: true },
		{ queryName: 'patientsPerDate' },
		{ queryName: 'deadPatientsPerDate' },
		{ queryName: 'recoveredPerDay' },
		{ queryName: 'testResultsPerDate' },
		{ queryName: 'infectedByAgeAndGenderPublic', parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
		{ queryName: 'isolatedDoctorsAndNurses' },
		{ queryName: 'contagionDataPerCityPublic' },
		{ queryName: 'hospitalStatus' }
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
	const staffData = data[6].data[0];
	const timeline = patientsPerDay.map((elem, index) => ({
		date: elem.date.match(dateRegex)[0],
		newHospitalized: elem.new_hospitalized,
		totalHospitalized: elem.Counthospitalized,
		homePatients: elem.patients_home,
		hotelPatients: elem.patients_hotel,
		totalBeds: elem.total_beds,
		standardOccupancy: elem.StandardOccupancy,
		newDeaths: deadPatientsPerDay[index].amount,
		newlyRecovered: recoveredPerDay[index].amount,
		newTestsTaken: testsPerDay[index].amount,
		newPositiveTests: testsPerDay[index].positiveAmount,
		activeNoncritical: elem.CountEasyStatus,
		activeModerate: elem.CountMediumStatus,
		activeCritical: elem.CountHardStatus,
		onVentilators: elem.CountBreath
	}));
	return {
		updated: new Date(data[0].data.lastUpdate).valueOf(),
		data: {
			sickByAge: data[5].data.map((entry) => {
				const { section, male, female } = entry;
				return { section: `ages ${section} - ${section + 10}`, male, female };
			}),
			healthPersonnel: {
				verifiedDoctors: staffData.Verified_Doctors,
				verifiedNurses: staffData.Verified_Nurses,
				isolatedDoctors: staffData.isolated_Doctors,
				isolatedNurses: staffData.isolated_Nurses,
				isolatedOtherSector: staffData.isolated_Other_Sector
			},
			cityData: data[7].data,
			hospitalData: data[8].data,
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
