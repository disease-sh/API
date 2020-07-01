const axios = require('axios');
const logger = require('../../../utils/logger');

const ukData = async () => {
	try {
		var data = { };
		const response = (await axios.get('https://api.coronavirus-staging.data.gov.uk/v1/data?filters=areaName=United%20Kingdom;areaType=overview&structure={"date": "date","todayTests": "newTestsByPublishDate","tests": "cumTestsByPublishDate","testCapacity": "plannedCapacityByPublishDate","newCases": "newCasesByPublishDate","cases": "cumCasesByPublishDate","hospitalized": "hospitalCases","usedVentilationBeds": "covidOccupiedMVBeds","newAdmissions": "newAdmissions","admissions": "cumAdmissions","newDeaths": "newDeathsByPublishDate","deaths": "cumDeathsByPublishDate"}')).data.data;
		for (const row of response.slice(0, response.length - 60)){
			data[row.date] = row;
			delete data[row.date].date;
		}
		return data;
	} catch (err) {
		logger.err('Error: Requesting UK Gov Data failed!', err);
		return null;
	}
};

module.exports = ukData;