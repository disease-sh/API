const axios = require('axios');
const logger = require('../../../utils/logger');

const israelData = async () => {
	try {
		const data = { };
		const response = await axios({
			url: 'https://datadashboardapi.health.gov.il/api/queries/_batch',
			method: 'post',
			data: {
				requests: [
					{ id: 'lastUpdate', queryName: 'lastUpdate', single: true, parameters: {} },
					{ id: 'active', queryName: 'infectedPerDate', single: false, parameters: {} },
					{	id: 'updatedPatientStatus', queryName: 'updatedPatientsOverallStatus', single: false, parameters: {} },
					{ id: 'sickPerDateTwoDays', queryName: 'sickPerDateTwoDays', single: false, parameters: {} },
					{ id: 'sickPerLocation', queryName: 'sickPerLocation', single: false, parameters: {} },
					{ id: 'cases', queryName: 'patientsPerDate', single: false, parameters: {} },
					{ id: 'deaths', queryName: 'deadPatientsPerDate', single: false, parameters: {} },
					{ id: 'recoveredDaily', queryName: 'recoveredPerDay', single: false, parameters: {} },
					{ id: 'testResults', queryName: 'testResultsPerDate', single: false, parameters: {} },
					{ id: 'doublingRate', queryName: 'doublingRate', single: false, parameters: {} },
					{ id: 'activeByAgeAndGender', queryName: 'infectedByAgeAndGenderPublic', single: false, parameters: { ageSections: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90] } },
					{ id: 'isolatedDoctorsAndNurses', queryName: 'isolatedDoctorsAndNurses', single: true, parameters: {} },
					{ id: 'cityData', queryName: 'contagionDataPerCityPublic', single: false, parameters: {} },
					{ id: 'hospitalStatus', queryName: 'hospitalStatus', single: false, parameters: {} }
				]
			}
		});
		data.updated = response.data[0].data.lastUpdate;
		for (const query of response.data.splice(1)) { data[query.id] = query.data; }
		return data;
	} catch (err) {
		logger.err('Error: Requesting Israel Gov Data failed!', err);
		return null;
	}
};

module.exports = israelData;
