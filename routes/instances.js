// NODE PACKAGES
const Redis = require('ioredis');

// LOCAL FUNCTIONS
const getWorldometerPage = require('../scrapers/getWorldometers');
const getStates = require('../scrapers/getStates');
const jhuLocations = require('../scrapers/jhuLocations');
const historical = require('../scrapers/historical');
const nytData = require('../scrapers/nytData');

// KEYS
const keys = require('../config.keys.json');

let config;
try {
	config = require('../config.json');
} catch (err) {
	config = require('../config.example.json');
}
const { getConfig } = require('../start');
const redis = new Redis(getConfig().redis.host, {
	password: getConfig().redis.password,
	port: getConfig().redis.port
});

module.exports = {
	redis,
	keys,
	config,
	scraper: {
		getWorldometerPage,
		getStates,
		jhuLocations,
		historical,
		nytData
	}
};
