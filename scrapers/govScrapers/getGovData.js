const canadaData = require('./getCanada');
const italyData = require('./getItaly');
const germanyData = require('./getGermany');
const austriaData = require('./getAustria');
const switzerlandData = require('./getSwitzerland');
const nigeriaData = require('./getNigeria');
const indiaData = require('./getIndia');
const vietnamData = require('./getVietnam');
const newZealandData = require('./getNewZealand');
const colombiaData = require('./getColombia');
const southAfricaData = require('./getSouthAfrica');

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
			{ country: 'South Africa', fn: southAfricaData },
			{ country: 'Canada', fn: canadaData },
			{ country: 'Italy', fn: italyData },
			{ country: 'Germany', fn: germanyData },
			{ country: 'Austria', fn: austriaData },
			{ country: 'Switzerland', fn: switzerlandData },
			{ country: 'Nigeria', fn: nigeriaData },
			{ country: 'India', fn: indiaData },
			{ country: 'Vietnam', fn: vietnamData },
			{ country: 'New Zealand', fn: newZealandData },
			{ country: 'Colombia', fn: colombiaData }
		].map(_resolveData));
		redis.set(keys.gov_countries, JSON.stringify(data));
		logger.info(`Updated gov data: ${Object.keys(data).length} government sources`);
	} catch (err) {
		logger.err('Error: Requesting Gov data failed!', err);
	}
};

module.exports = govData;
