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
			// need to transform data
			const { data } = await axios.get(url);
			const parsedData = await csv().fromString(data);
			const formattedData = {};
			for (const index in parsedData) {
				const element = parsedData[index];
				const { country, ...rest } = element;
				if (rest.subregion_and_city === 'Total') {
					// eslint-disable-next-line camelcase
					rest.subregion_and_city = 'all';
				}
				if (country in formattedData) {
					formattedData[country].push(rest);
				} else {
					formattedData[country] = [rest];
				}
			}
			redis.set(keys.apple_all, JSON.stringify(formattedData));
		};

		await _resolveData(GITHUB_URL);
		logger.info('Apple Data successfully retrieved');
		await updateAppleCache();
	} catch (err) {
		logger.err('Error: Requesting Apple data failed!', err);
	}
};

module.exports = appleData;
