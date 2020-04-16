/*
Local cache to avoid unnecessary JSON parsing during NYT data retrieval
Status of cache will update every time data is successfully scraped
*/
const logger = require('../utils/logger');

exports.currentStatus = {
	nytCounties: undefined,
	nytStates: undefined,
	nytNationwide: undefined
};

// Series of get calls to retrieve current state of cache
exports.nytCounties = () => this.currentStatus.nytCounties;
exports.nytStates = () => this.currentStatus.nytStates;
exports.nytNationwide = () => this.currentStatus.nytNationwide;

// Retrieves NYT data from Redis and stores it locally when data is updated
exports.updateCache = async () => {
	try {
		const { redis, keys } = require('../routes/instances');
		const [parsedCountyData, parsedStateData, parsedNationData] = await Promise.all([
			keys.nyt_counties,
			keys.nyt_states,
			keys.nyt_USA
		].map(async (key) => JSON.parse(await redis.get(key))));
		this.currentStatus.nytCounties = parsedCountyData;
		this.currentStatus.nytStates = parsedStateData;
		this.currentStatus.nytNationwide = parsedNationData;
		logger.info('NYT local cache updated');
	} catch (err) {
		logger.err('Local NYT cache update failed', err);
	}
};

