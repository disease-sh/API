const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../../utils/logger');

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master';
const US_COUNTY_DATA_URL = `${GITHUB_BASE_URL}/us-counties.csv`;
const US_STATE_DATA_URL = `${GITHUB_BASE_URL}/us-states.csv`;
const US_NATION_WIDE_DATA_URL = `${GITHUB_BASE_URL}/us.csv`;

const groupBy = (arr, property) => arr.reduce((memo, el) => {
	if (!memo[el[property]]) { memo[el[property]] = []; }
	memo[el[property]].push(el);
	return memo;
}, {});

const countyData = async (keys, redis, data) => {
	// Set used to get only unique dates in the data array
	const dates = new Set();

	// store the length so it's only calculated once
	const dataLength = data.length;

	// populate Set with the data array in reverse order
	for (let i = dataLength - 1; i >= 0; i--) { dates.add(data[i].date); }

	// transform set back into an array for easier iteration
	const datesArr = [...dates];

	// push the full data into the head of the redis list (index 0)
	redis.hset(keys.nyt_counties, 'all', JSON.stringify(data));

	// store the grouped data array
	const groupedByDate = groupBy(data, 'date');

	// generate a hash field for each index, where index = lastdays, and each item's data is cumulative
	let idx = 1;
	while (idx <= 30) {
		const buildArr = async () => {
			const arr = [];
			for (let i = 0; i <= idx; i++) {
				arr.unshift(...groupedByDate[datesArr[i]]);
			}
			redis.hset(keys.nyt_counties, idx, JSON.stringify(arr));
			idx++;
		};
		await buildArr();
	}
	logger.info('NYT County Data Updated Successfully');
};

const stateData = async (keys, redis, data) => {
	redis.set(keys.nyt_states, JSON.stringify(data));
	logger.info('NYT State Data Updated Successfully');
};

const nationalData = async (keys, redis, data) => {
	redis.set(keys.nyt_USA, JSON.stringify(data));
	logger.info('NYT National Data Updated Successfully');
};

/**
 * Retrieves NYT data from github and stores it in redis
 * @param {Object} keys Redis keys sourced from configurations
 * @param {Object} redis Redis instance
 */
const nytData = async (keys, redis) => {
	try {
		const _resolveData = async (obj) => {
			const { url, fn } = obj;
			const { data } = await axios.get(url);
			const parsedData = await csv().fromString(data);

			await fn(keys, redis, parsedData);
		};

		await Promise.all([
			{ url: US_COUNTY_DATA_URL, fn: countyData },
			{ url: US_STATE_DATA_URL, fn: stateData },
			{ url: US_NATION_WIDE_DATA_URL, fn: nationalData }
		].map(_resolveData));
		logger.info('NYT Data successfully retrieved');
	} catch (err) {
		logger.err('Error: Requesting NYT data failed!', err);
	}
};

// nytData().then(res => console.log(res));

module.exports = nytData;
