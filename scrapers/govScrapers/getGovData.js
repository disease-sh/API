const canadaData = require('./getCanada.js');
const logger = require('../../utils/logger');

const govData = async (keys, redis) => {
	const data = [canadaData()];
	redis.set(keys.gov_countries, JSON.stringify(data));
	logger.info(`Updated gov data: ${data.length} government sources`);
};


module.exports = govData;
