const Redis = require('ioredis');
const config = require('../config.json');
const scraper = require('../scraper');

const redis = new Redis(config.redis.host, {
	password: config.redis.password,
	port: config.redis.port
});

module.exports = {
	redis,
	config,
	scraper
};
