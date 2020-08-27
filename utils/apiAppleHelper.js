/*
Helper file for the Apple Endpoints
*/

const logger = require('./logger');

exports.appleData = async (redis, keys) => await fetchAppleData(redis, keys);

const fetchAppleData = async (redis, keys) => {
	var parsedAppleData = '';
	try {
		parsedAppleData = JSON.parse(await redis.get(keys.apple_all));
		const numericalStats = (element) => ({ ...element, driving: parseFloat(element.driving), transit: parseFloat(element.transit), walking: parseFloat(element.walking) });
		if (!parsedAppleData) {
			logger.warn('Could not fetch Apple data from cache, no error.');
		} else {
			// eslint-disable-next-line no-return-assign
			Object.keys(parsedAppleData).forEach((countryName) => parsedAppleData[countryName].data = parsedAppleData[countryName].data.map(numericalStats));
			logger.info('Apple Cache Data Fetched');
		}
	} catch (err) {
		logger.err('Local Apple Data Fetch failed', err);
	}
	return parsedAppleData;
};
