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
const ukData = require('./getUK');
const israelData = require('./getIsrael');
const mexicoData = require('./getMexico');

const logger = require('../../../utils/logger');

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
			const countryData = await fn();
			// If no data is returned, serve stale data instead of an error
			// if (countryData === null) {
			// 	const redisGovData = JSON.parse(await redis.get(keys.gov_countries));
			// 	countryData = redisGovData[country];
			// }
			data[country] = countryData;
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
			{ country: 'Colombia', fn: colombiaData },
			{ country: 'UK', fn: ukData },
			{ country: 'Israel', fn: israelData },
			{ country: 'Mexico', fn: mexicoData }
		].map(_resolveData));
		redis.set(keys.gov_countries, JSON.stringify(data));
		logger.info(`Updated gov data: ${Object.keys(data).length} government sources`);
	} catch (err) {
		logger.err('Error: Requesting Gov data failed!', err);
	}
};

module.exports = govData;
