const axios = require('axios');
const logger = require('../../utils/logger');

const filters = ['Recuperado', 'Fallecido'];


const transformData = (data, cities) => {
	const state = 13;
	const pos = cities
		? 11 : 12;
	const recovered = filterData(data, state, filters[0], pos);
	const deceased = filterData(data, state, filters[1], pos);
	const merged = mergeData(recovered, deceased);
	return merged;
};

const mergeData = (recovered, deceased) => {
	const merge = Object.keys(recovered).reduce((map, key) => {
		map[key] = key in deceased
			? { deceased: deceased[key], recovered: recovered[key] }
			: { recovered: recovered[key] };
		return map;
	}, {});
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
		console.log(colombiaResponse.data);
		return {
			updated: Date.now(),
			department: transformData(colombiaResponse.data, false),
			cities: transformData(colombiaResponse.data, true)
		};
	} catch (err) {
		logger.err('Error: Requesting Colombia Gov Data failed!', err);
		return null;
	}
};

module.exports = colombiaData;
