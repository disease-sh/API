// NODE PACKAGES
const Redis = require('ioredis');

// LOCAL FUNCTIONS
const logger = require('../utils/logger');
const getWorldometerPage = require('../scrapers/getWorldometers');
const getStates = require('../scrapers/getStates');
const jhuLocations = require('../scrapers/jhuLocations');
const historical = require('../scrapers/historical');
const nytData = require('../scrapers/nytData');
const appleData = require('../scrapers/appleMobilityData');
const govData = require('../scrapers/govScrapers/getGovData');

// KEYS
const { config, keys, port } = require('../config');

const redis = new Redis(config.redis.host, {
	password: config.redis.password,
	port: config.redis.port
});

module.exports = {
	redis,
	port,
	keys,
	config,
	scraper: {
		getWorldometerPage,
		getStates,
		jhuLocations,
		historical,
		nytData,
		appleData,
		executeScraper: async () => {
			await Promise.all([
				getWorldometerPage(keys, redis),
				getStates(keys, redis),
				jhuLocations.jhudataV2(keys, redis),
				historical.historicalV2(keys, redis),
				historical.getHistoricalUSADataV2(keys, redis)
			]);
			logger.info('Finished scraping!');
		},
		executeScraperNYTData: async () => {
			await nytData(keys, redis);
			logger.info('Finished NYT scraping!');
		},
		excecuteScraperAppleData: async () => {
			await appleData(keys, redis);
			logger.info('Finished Apple scraping!');
		},
		excecuteScraperGov: async () => {
			await govData(keys, redis);
			logger.info('Finished Government scraping!');
		}
	}
};
