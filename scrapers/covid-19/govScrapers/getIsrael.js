const axios = require('axios');
const logger = require('../../../utils/logger');

const params = {
	requests: [
		{ queryName: 'lastUpdate', single: true },
		{ queryName: 'patientsPerDate' },
		{ queryName: 'deadPatientsPerDate' },
		{ queryName: 'recoveredPerDay' },
		{ queryName: 'testResultsPerDate' },
		{ queryName: 'isolatedVerifiedDoctorsAndNurses' },
		{ queryName: 'contagionDataPerCityPublic' },
		{ queryName: 'hospitalStatus' },
		{ queryName: 'infectedByAgeAndGenderPublic', parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
		{ queryName: 'deadByAgeAndGenderPublic', parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
		{ queryName: 'breatheByAgeAndGenderPublic', parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
		{ queryName: 'severeByAgeAndGenderPublic', parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
		{ queryName: 'spotlightPublic' },
		{ queryName: 'spotlightLastupdate' }
	]
};

/**
 * Parses and cleans rows of data returned from Israeli government API
 * @param 	{Array} 	data 	Set of data pulled from Israeli API with element for each individual query
 * @returns {Object}			Cleaned and parsed data to be displayed in API
 */
const parseData = (data) => {
	const labelAgeGroup = (el) => el.data.map((entry, i) => {
		const { section, male, female } = entry;
		return { section: i === el.data.length - 1 ? `+${section}` : `${section} - ${section + 9}`, male, female };
	})
	const translateColor = (color) => {
		switch (true) {
			case /אדום/.test(color): return 'red';
			case /כתום/.test(color): return 'orange';
			case /צהוב/.test(color): return 'yellow';
			case /ירוק/.test(color): return 'green';
			default: return color;
		}
	}
	const dateRegex = /\d+-\d+-\d+/g;
	const patientsPerDay = data[1].data;
	const deadPatientsPerDay = data[2].data;
	const recoveredPerDay = data[3].data.splice(20, data[3].data.length - 1);
	const testsPerDay = data[4].data.splice(30, data[4].data.length - 1);
	const staffData = data[5].data;
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
		newTotalTestsTaken: testsPerDay[index].amount,
		newVirusTestsTaken: testsPerDay[index].amountVirusDiagnosis,
		newPositiveTests: testsPerDay[index].positiveAmount,
		activeNoncritical: elem.CountEasyStatus,
		activeModerate: elem.CountMediumStatus,
		activeCritical: elem.CountHardStatus,
		onVentilators: elem.CountBreath
	}));
	return {
		updated: new Date(data[0].data.lastUpdate).valueOf(),
		data: {
			byAgeAndGender: {
				cases: labelAgeGroup(data[8]),
				deaths: labelAgeGroup(data[9]),
				onVentilators: labelAgeGroup(data[10]),
				critical: labelAgeGroup(data[11])
			},
			healthPersonnel: {
				verifiedDoctors: null,
				verifiedNurses: null,
				isolatedDoctors: staffData[0].amount,
				isolatedNurses: staffData[1].amount,
				isolatedOtherSector: staffData[2].amount
			},
			cityData: data[6].data,
			hospitalData: data[7].data,
			threeStagePlan: {
				cityData: data[12].data.map((city) => ({
					name: city.name,
					score: city.score,
					color: translateColor(city.color),
					newCasesPer10kLastWeek: city.sickTo10000,
					pctPositiveTestsLastWeek: city.positiveTests,
					activeCases: city.activeSick
				})),
				lastUpdate: new Date(data[13].data).valueOf()
			},
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
