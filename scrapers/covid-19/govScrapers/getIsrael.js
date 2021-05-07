const axios = require('axios');
const logger = require('../../../utils/logger');

const params = {
	requests: [
		{ queryName: 'lastUpdate', single: true },
		{ queryName: 'patientsPerDate' },
		{ queryName: 'deadPatientsPerDate' },
		{ queryName: 'recoveredPerDay' },
		{ queryName: 'testResultsPerDate' },
		{ queryName: 'infectedByPeriodAndAgeAndGender' },
		{ queryName: 'deadByPeriodAndAgeAndGender' },
		{ queryName: 'breatheByPeriodAndAgeAndGender' },
		{ queryName: 'severeByPeriodAndAgeAndGender' },
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
	// filter out data by time frame and remove  title
	const getAgeGroupData = (el, periodName) => el.data
		.filter(section => section.period === periodName)
		.map((entry) => {
			const { section, male, female } = entry;
			return { section, male, female };
		});
	const byAgeAndGender = ['cases', 'deaths', 'onVentilators', 'critical'].map((type, i) => ({
		[type]: {
			allTime: getAgeGroupData(data[5 + i], 'מתחילת קורונה'),
			oneYear: getAgeGroupData(data[5 + i], 'שנה'),
			sixMonths: getAgeGroupData(data[5 + i], '6 חודשים'),
			threeMonths: getAgeGroupData(data[5 + i], '3 חודשים'),
			oneMonth: getAgeGroupData(data[5 + i], 'חודש אחרון')
		}
	}));
	const translateColor = (color) => {
		switch (true) {
			case /אדום/.test(color): return 'red';
			case /כתום/.test(color): return 'orange';
			case /צהוב/.test(color): return 'yellow';
			case /ירוק/.test(color): return 'green';
			default: return color;
		}
	};
	const dateRegex = /\d+-\d+-\d+/g;
	const patientsPerDay = data[1].data;
	const deadPatientsPerDay = data[2].data;
	const recoveredPerDay = data[3].data.splice(20, data[3].data.length - 1);
	const testsPerDay = data[4].data.splice(11, data[4].data.length - 1);
	const isTimelineSynced = patientsPerDay[patientsPerDay.length - 1].date.match(dateRegex)[0] === testsPerDay[testsPerDay.length - 1].date.match(dateRegex)[0];
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
		newTotalTestsTaken: isTimelineSynced ? testsPerDay[index].amount : null,
		newVirusTestsTaken: isTimelineSynced ? testsPerDay[index].amountVirusDiagnosis : null,
		newPositiveTests: isTimelineSynced ? testsPerDay[index].positiveAmount : null,
		activeNoncritical: elem.CountEasyStatus,
		activeModerate: elem.CountMediumStatus,
		// Total active patients in Serious (including critical) condition hospitalized
		activeSerious: elem.CountHardStatus,
		// Total active patients in Critical condition hospitalized
		activeCritical: elem.CountCriticalStatus,
		// Number of patients on ventilators in hospitals
		onVentilators: elem.CountBreath
	}));
	return {
		updated: new Date(data[0].data.lastUpdate).valueOf(),
		data: {
			byAgeAndGender: byAgeAndGender,
			healthPersonnel: null,
			cityData: null,
			hospitalData: null,
			trafficLightMap: {
				cityData: data[9].data.map((city) => ({
					name: city.name,
					score: city.score,
					color: translateColor(city.color),
					// The number of new patients in the last week per 10,000 persons
					newCasesPer10kLastWeek: city.sickTo10000,
					// (decimal number) The percentage of positive tests out of the total tests for the virus performed in the last week in the locality
					pctPositiveTestsLastWeek: city.positiveTests,
					// (decimal number) Percentage change in the number of new patients in the last week compared to the previous week in the locality.
					weeklyChangeInCasesPer10k: city.growthLastWeek,
					activeCases: city.activeSick
				})),
				lastUpdate: new Date(data[10].data).valueOf()
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
