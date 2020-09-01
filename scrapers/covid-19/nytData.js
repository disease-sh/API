const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../../utils/logger');

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master';
const US_COUNTY_DATA_URL = `${GITHUB_BASE_URL}/us-counties.csv`;
const US_STATE_DATA_URL = `${GITHUB_BASE_URL}/us-states.csv`;
const US_NATION_WIDE_DATA_URL = `${GITHUB_BASE_URL}/us.csv`;
const DAYS_TO_CACHE = 30;

const groupBy = async (arr, property) => arr.reduce((memo, el) => {
	if (!memo[el[property]]) { memo[el[property]] = []; }
	memo[el[property]].push(el);
	return memo;
}, {});

const buildDatesArr = async (data) => {
	// Set used to get only unique dates in the data array
	const dates = new Set();
	// store the length so it's only calculated once
	const dataLength = data.length;
	// populate Set with the data array in reverse order
	for (let i = dataLength - 1; i >= 0; i--) { dates.add(data[i].date); }
	// transform set back into an array for easier iteration
	const datesArr = [...dates];
	// store the grouped data array
	const groupedByDate = await groupBy(data, 'date');
	return { datesArr, groupedByDate };
};

const buildCache = async (key, redis, data) => {
	try {
		const { datesArr, groupedByDate } = await buildDatesArr(data);
		// set the latest date available in a key for easy access
		await redis.hset(key, 'latest', JSON.stringify(datesArr[0]));
		// push the full data into redis with field name 'data'
		await redis.hset(key, 'data', JSON.stringify(data));

		// generate a hash field for each index, where index = lastdays, and each field's data is cumulative
		let idx = 1;
		while (idx <= DAYS_TO_CACHE) {
			const inner = async () => {
				const cumulativeData = [];
				for (let i = 0; i < idx; i++) {
					cumulativeData.unshift(...groupedByDate[datesArr[i]]);
				}
				await redis.hset(key, idx, JSON.stringify(cumulativeData));
				idx++;
			};
			await inner();
		}
	} catch (err) {
		logger.err(`Error building cache for key: ${key}`);
	}
};

/**
 * Retrieves NYT data from github and stores it in redis
 * @param {Object} keys Redis keys sourced from configurations
 * @param {Object} redis Redis instance
 */
const nytData = async (keys, redis) => {
	try {
		const _resolveData = async (obj) => {
			const { url, key } = obj;
			const { data } = await axios.get(url);
			const parsedData = await csv().fromString(data);

			await buildCache(key, redis, parsedData);
		};

		await Promise.all([
			{ url: US_COUNTY_DATA_URL, key: keys.nyt_counties },
			{ url: US_STATE_DATA_URL, key: keys.nyt_states },
			{ url: US_NATION_WIDE_DATA_URL, key: keys.nyt_USA }
		].map(_resolveData));

		logger.info('NYT Data successfully retrieved');
	} catch (err) {
		logger.err('Error: Requesting NYT data failed!', err);
	}
};

module.exports = nytData;
