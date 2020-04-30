const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../utils/logger');
const { updateAppleCache } = require('../utils/apple_cache');

const GITHUB_URL = 'https://raw.githubusercontent.com/ActiveConclusion/COVID19_mobility/master/apple_reports/apple_mobility_report.csv';

/**
 * Retrieves Apple mobility data from github and stores it in redis
 * @param {Object} keys Redis keys sourced from configurations
 * @param {Object} redis Redis instance
 */
const appleData = async (keys, redis) => {
	try {
		const _resolveData = async (url) => {
			const { data } = await axios.get(url);
			const parsedData = await csv().fromString(data);
			redis.set(keys.apple_all, JSON.stringify(parsedData));
		};

		await _resolveData(GITHUB_URL);
		logger.info('Apple Data successfully retrieved');
		await updateAppleCache();
	} catch (err) {
		logger.err('Error: Requesting Apple data failed!', err);
	}
};

module.exports = appleData;
