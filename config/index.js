const keys = require('./config.keys.json');
const logger = require('../utils/logger');
const dotenv = require('dotenv').config();
const config = { redis: {} };

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
config.worldometersInterval = process.env.INTERVAL || 6e5;
// eslint-disable-next-line camelcase
config.nytInterval = process.env.NYT_INTERVAL || 2.16e+7;
// eslint-disable-next-line camelcase
config.appleInterval = process.env.APPLE_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.govInterval = process.env.GOV_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.vaccineInterval = process.env.VACCINE_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.vaccineCoverageInterval = process.env.VACCINE_COVERAGE_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.therapeuticsInterval = process.env.THERAPEUTICS_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.ebolaInterval = process.env.EBOLA_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.cdcInterval = process.env.CDC_INTERVAL || 864e5;
// eslint-disable-next-line camelcase
config.variantInterval = process.env.VARIANT_INTERVAL || 864e5;

// SENTRY KEY (ONLY FOR PRODUCTION)
// eslint-disable-next-line camelcase
config.sentryKey = process.env.SENTRY_KEY;

// MAILGUN API KEY (ONLY FOR PRODUCTION)
config.mailgunApiKey = process.env.MAILGUN_API_KEY;

// RECAPTCHA SECRET (ONLY FOR PRODUCTION)
config.captchaSecret = process.env.CAPTCHA_SECRET;

// RECAPTCHA PUBLIC KEY (ONLY FOR PRODUCTION)
config.captchaToken = process.env.CAPTCHA_TOKEN;

module.exports = {
	config,
	keys,
	port
};
