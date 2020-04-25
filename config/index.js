const keys = require('./config.keys.json');
let port;
let config;

try {
	config = require('./config.json');
} catch (err) {
	config = require('./config.example.json');
}
port = process.env.SERVER_PORT || config.port || 3000;
config.redis.host = process.env.REDIS_HOST ? process.env.REDIS_HOST : config.redis.host;
config.redis.port = process.env.REDIS_PORT ? process.env.REDIS_PORT : config.redis.port;
config.redis.password = process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : config.redis.password;

module.exports = {
	config,
	keys,
	port
};
