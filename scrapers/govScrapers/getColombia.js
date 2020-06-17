const axios = require('axios');
const logger = require('../../utils/logger');
const { renameKeys } = require('../../utils/keyUtils');

const transformData = (data, cities) => {
	const state = 13;
	const gender = 15;
	const pos = cities ? 11 : 12;
	const info = getInfo(data, state, gender, pos, cities);
	const result = renameKeys(info, 'co');
	return result;
};

const getInfo = (data, state, gender, place, cities) => {
	const type = cities ? 'city' : 'department';
	const result = [];
	data.forEach((element) => {
		if (!result[element[place]]) {
			result[element[place]] = { [type]: element[place], cases: 0 };
		}
		result[element[place]].cases += 1;
		result[element[place]][element[state]] = (result[element[place]][element[state]] || 0) + 1;
		result[element[place]][element[gender]] = (result[element[place]][element[gender]] || 0) + 1;
	});
	return Object.values(result);
};

/**
 * Scrapes Colombian government javascript data and returns an object containing this data
 */
const colombiaData = async () => {
	try {
		const colombiaResponse = (await axios.get('https://www.datos.gov.co/api/views/gt2j-8ykr/rows.json')).data;
		return {
			updated: Date.now(),
			departments: transformData(colombiaResponse.data, false),
			cities: transformData(colombiaResponse.data, true)
		};
	} catch (err) {
		logger.err('Error: Requesting Colombia Gov Data failed!', err);
		return null;
	}
};

module.exports = colombiaData;
