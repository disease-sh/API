const Redis = require('ioredis');
const scraper = require('../scraper');
let config;
try {
	config = require('../config.json');
} catch (err) {
	config = require('../config.example.json');
}

const redis = new Redis(config.redis.host, {
	password: config.redis.password,
	port: config.redis.port
});

module.exports = {
	redis,
	config,
	scraper
};
