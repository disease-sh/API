const canadaData = require('./getCanada');
const italyData = require('./getItaly');
const germanyData = require('./getGermany');
const austriaData = require('./getAustria');
const switzerlandData = require('./getSwitzerland');
const nigeriaData = require('./getNigeria');
const indiaData = require('./getIndia');
const newZealandData = require('./getNewZealand');
const southAfricaData = require('./getSouthAfrica');
const ukData = require('./getUK');
const israelData = require('./getIsrael');
const vietnamData = require('./getVietnam');
const nameUtils = require('../../../utils/nameUtils');

const logger = require('../../../utils/logger');

/**
 * Set government data in redis by calling individual country scrapers
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const govData = async (keys, redis) => {
	try {
		const _resolveData = async (obj) => {
			const { country, fn } = obj;
			const countryData = await fn();

			if (countryData) {
				const standardizedCountryName = nameUtils.getCountryData(country.trim()).country;
				await redis.hset(keys.gov_countries, standardizedCountryName, JSON.stringify(countryData));
			} else {
				logger.info(`${country} scraper has failed.`);
			}
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
			{ country: 'New Zealand', fn: newZealandData },
			{ country: 'UK', fn: ukData },
			{ country: 'Israel', fn: israelData },
			{ country: 'Vietnam', fn: vietnamData }
		].map(_resolveData));

		logger.info(`Updated gov data: ${(await redis.hkeys(keys.gov_countries)).length} government sources`);
	} catch (err) {
		logger.err('Error: Requesting Gov data failed!', err);
	}
};

module.exports = govData;
