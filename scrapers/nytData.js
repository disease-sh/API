const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../utils/logger');
const { updateCache } = require('../utils/nyt_cache');

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master';
const US_COUNTY_DATA_URL = `${GITHUB_BASE_URL}/us-counties.csv`;
const US_STATE_DATA_URL = `${GITHUB_BASE_URL}/us-states.csv`;
const US_NATION_WIDE_DATA_URL = `${GITHUB_BASE_URL}/us.csv`;
const REDIS_KEYS = ['nyt_counties', 'nyt_states', 'nyt_USA'];

/**
 * Retrieves NYT data from github and stores it in redis
 * @param {Object} keys Redis keys sourced from configurations
 * @param {Object} redis Redis instance
 */
const nytData = async (keys, redis) => {
	try {
		const _resolveData = async (url, index) => {
			const { data } = await axios.get(url);
			const parsedData = await csv().fromString(data);
			redis.set(keys[REDIS_KEYS[index]], JSON.stringify(parsedData));
		};

		await Promise.all([
			US_COUNTY_DATA_URL,
			US_STATE_DATA_URL,
			US_NATION_WIDE_DATA_URL
		].map(_resolveData));
		logger.info('NYT Data successfully retrieved');
		await updateCache();
	} catch (err) {
		return logger.err('Error: Requesting NYT data failed!', err);
	}
};

module.exports = nytData;
