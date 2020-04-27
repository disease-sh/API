require('dotenv').config();
const keys = require('./config.keys.json');
let config;

try {
	config = require('./config.json');
} catch (err) {
	config = require('./config.example.json');
}
//SERVER PORT
const port = process.env.SERVER_PORT || config.port || 3000;
//REDIS CONFIGURATION
config.redis.host = process.env.REDIS_HOST || config.redis.host || localhost;
config.redis.port = process.env.REDIS_PORT || config.redis.port || 6379;
config.redis.password = process.env.REDIS_PASSWORD || config.redis.password || '';
// SCRAPER INTERVALS
config.interval = process.env.INTERVAL || config.interval || 6e5; // DEFAULT 10 minutes
config.nyt_interval = process.env.NYT_INTERVAL || config.nyt_interval || 864e5; // DEFAULT 24hrs

module.exports = {
	config,
	keys,
	port
};
