/*
Helper file for the Apple Endpoints
*/

const logger = require('./logger');

const appleData = async (redis, keys) => {
	var parsedAppleData = '';
	try {
		parsedAppleData = JSON.parse(await redis.get(keys.apple_all));
		const numericalStats = (element) => ({ ...element, driving: parseFloat(element.driving), transit: parseFloat(element.transit), walking: parseFloat(element.walking) });
		if (!parsedAppleData) {
			logger.warn('Could not fetch Apple data from redis, no error.');
		} else {
			// eslint-disable-next-line no-return-assign
			Object.keys(parsedAppleData).forEach((countryName) => parsedAppleData[countryName].data = parsedAppleData[countryName].data.map(numericalStats));
		}
	} catch (err) {
		logger.err('Local Apple Data Fetch failed', err);
	}
	return parsedAppleData;
};

module.exports = appleData;
