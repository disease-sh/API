const axios = require('axios');
const logger = require('../../utils/logger');

const transformData = (data, cities) => {
	const state = 13;
	const pos = cities ? 11 : 12;
	const recovered = filterData(data, state, 'Recuperado', pos);
	const deceased = filterData(data, state, 'Fallecido', pos);
	const merged = cities
		? mergeData(recovered, deceased, cities)
		: mergeData(recovered, deceased);
	return merged;
};

const mergeData = (recovered, deceased, cities) => {
	const type = cities ? 'city' : 'department';
	const merge = Object.keys(recovered).map((key) => key in deceased
		? { [type]: key, deceased: deceased[key], recovered: recovered[key] }
		: { [type]: key, recovered: recovered[key] }, {});
	return merge;
};


const filterData = (data, state, filter, pos) =>
	data.filter((row) => row[state] === filter)
		.reduce((acc, curr) => {
			acc[curr[pos]] = (acc[curr[pos]] || 0) + 1;
			return acc;
		}, {});

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
