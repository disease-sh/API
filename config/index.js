const keys = require('./config.keys.json');
const logger = require('../utils/logger');
const dotenv = require('dotenv').config();
const config = { redis: { } };

if (dotenv.error) {
	if (!process.env.DOCKER) {
		logger.err('Failed to load environment variables', dotenv.error);
	}
	logger.info('Using default settings');
} else {
	logger.info('Using settings from .env file');
}

// SERVER PORT
const port = process.env.SERVER_PORT || 3000;

// REDIS CONFIGURATION
config.redis.host = process.env.REDIS_HOST || (process.env.DOCKER ? 'redis' : 'localhost');
config.redis.port = process.env.REDIS_PORT || 6379;
config.redis.password = process.env.REDIS_PASSWORD || '';

// SCRAPER INTERVALS
config.interval = process.env.INTERVAL || 6e5;
// eslint-disable-next-line camelcase
config.nyt_interval = process.env.NYT_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.apple_interval = process.env.APPLE_INTERVAL || 864e5;

// SENTRY KEY (ONLY FOR PRODUCTION)
// eslint-disable-next-line camelcase
config.sentry_key = process.env.SENTRY_KEY;

// MAILGUN API KEY (ONLY FOR PRODUCTION)
config.mailgunApiKey = process.env.MAILGUN_API_KEY;

// RECAPTCHA SECRET (ONLY FOR PRODUCTION)
config.captchaSecret = process.env.CAPTCHA_SECRET;

module.exports = {
	config,
	keys,
	port
};
