const keys = require('./config.keys.json');
const logger = require('../utils/logger');
let config = { redis: { }, empty: true };

if (require('dotenv').config().error) {
	try {
		config = require('./config.json');
	} catch (err) {
		logger.warn('You should either specify a config.json file in /config or a .env file in the directory root');
	} finally {
		if (config.empty) {
			logger.info('Using default settings');
		} else {
			logger.info('Using settings from config.json file');
		}
	}
} else {
	logger.info('Using settings from .env file');
}
delete config.empty;

// SERVER PORT
const port = process.env.SERVER_PORT || config.port || 3000;

// REDIS CONFIGURATION
config.redis.host = process.env.REDIS_HOST || (config.redis && config.redis.host ? config.redis.host : 'localhost');
config.redis.port = process.env.REDIS_PORT || (config.redis && config.redis.port ? config.redis.port : 6379);
config.redis.password = process.env.REDIS_PASSWORD || (config.redis && config.redis.password ? config.redis.password : '');

// SCRAPER INTERVALS
// DEFAULT 10 minutes
config.interval = process.env.INTERVAL || config.interval || 6e5;
// DEFAULT 24hrs
// eslint-disable-next-line camelcase
config.nyt_interval = process.env.NYT_INTERVAL || config.nyt_interval || 864e5;

// SENTRY KEY (ONLY FOR PRODUCTION)
// eslint-disable-next-line camelcase
config.sentry_key = process.env.SENTRY_KEY || config.sentry_key;

module.exports = {
	config,
	keys,
	port
};
