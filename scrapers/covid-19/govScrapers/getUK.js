const axios = require('axios');
const https = require('https');
const logger = require('../../../utils/logger');

const instance = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
});

const ukData = async () => {
	try {
		const data = {};

		const structure = {
			date: 'date',
			todayTests: 'newTestsByPublishDate',
			tests: 'cumTestsByPublishDate',
			testCapacity: 'plannedCapacityByPublishDate',
			newCases: 'newCasesByPublishDate',
			cases: 'cumCasesByPublishDate',
			hospitalized: 'hospitalCases',
			usedVentilationBeds: 'covidOccupiedMVBeds',
			newAdmissions: 'newAdmissions',
			admissions: 'cumAdmissions',
			todayDeaths: 'newDeaths28DaysByPublishDate',
			totalDeaths: 'cumDeaths28DaysByPublishDate',
			ONSweeklyDeaths: 'newOnsDeathsByRegistrationDate',
			ONStotalDeaths: 'cumOnsDeathsByRegistrationDate'
		};

		const URL = (await instance.get(`https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=United%20Kingdom;areaType=overview&structure=${JSON.stringify(structure)}`)).data;
		// const URL_STG = (await instance.get(`https://api.coronavirus-staging.data.gov.uk/v1/data?filters=areaName=United%20Kingdom;areaType=overview&structure=${JSON.stringify(structure)}`)).data;

		return Promise.race([URL]).then(res => {
			for (const row of res.data.slice(0, res.length - 60)) {
				data[row.date] = row;
				delete data[row.date].date;
			}
			return data;
		});
	} catch (err) {
		logger.err('Error: Requesting UK Gov Data failed!', err);
		return null;
	}
};

module.exports = ukData;
