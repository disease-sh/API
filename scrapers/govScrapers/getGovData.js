const canadaData = require('./getCanada.js');
const logger = require('../../utils/logger');

/**
 * Set government data in redis by calling individual country scrapers
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const govData = async (keys, redis) => {
	try {
		const data = {};
		const _resolveData = async (obj) => {
			const { country, fn } = obj;
			data[country] = await fn();
		};
		await Promise.all([
			{ country: 'Canada', fn: canadaData }
		].map(_resolveData));
		redis.set(keys.gov_countries, JSON.stringify(data));
		logger.info(`Updated gov data: ${Object.keys(data).length} government sources`);
	} catch (err) {
		logger.err('Error: Requesting Gov data failed!', err);
	}
};


module.exports = govData;
