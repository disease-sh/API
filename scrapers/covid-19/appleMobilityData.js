const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../../utils/logger');
const nameUtils = require('../../utils/nameUtils');

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
			const standardizedData = {};
			for (const index in parsedData) {
				const element = parsedData[index];
				const { country, ...rest } = element;
				// eslint-disable-next-line camelcase, no-unused-expressions
				rest.subregion_and_city === 'Total' && (rest.subregion_and_city = 'All');
				if (country in formattedData) {
					formattedData[country].data.push(rest);
					if (formattedData[country].subregions.indexOf(rest.subregion_and_city) === -1) {
						formattedData[country].subregions.push(rest.subregion_and_city);
					}
				} else {
					formattedData[country] = { data: [rest], subregions: [rest.subregion_and_city] };
				}
			}
			for (const country of Object.keys(formattedData)) {
				const standardizedCountry = nameUtils.getCountryData(country).country || country;
				standardizedData[standardizedCountry] = formattedData[country];
			}
			redis.set(keys.apple_all, JSON.stringify(standardizedData));
		};

		await _resolveData(GITHUB_URL);
		logger.info('Apple Data successfully retrieved');
	} catch (err) {
		logger.err('Error: Requesting Apple data failed!', err);
	}
};

module.exports = appleData;
