const canadaData = require('./getCanada.js');
const logger = require('../../utils/logger');

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
		redis.set(keys.gov_countries, JSON.stringify(Object.keys(data)));
		logger.info(`Updated gov data: ${Object.keys(data).length} government sources`);
	} catch (err) {
		logger.err('Error: Requesting Gov data failed!', err);
	}
};


module.exports = govData;
