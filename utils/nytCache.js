/*
Local cache to avoid unnecessary JSON parsing during NYT data retrieval
Status of cache will update every time data is successfully scraped
*/
const logger = require('./logger');

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
exports.updateNYTCache = async () => {
	try {
		const { redis, keys } = require('../routes/instances');
		const [parsedCountyData, parsedStateData, parsedNationData] = await Promise.all([
			keys.nyt_counties,
			keys.nyt_states,
			keys.nyt_USA
		].map(async (key) => JSON.parse(await redis.get(key))));
		const numericalStats = (element) => (
			{ ...element, deaths: parseInt(element.deaths), cases: parseInt(element.cases) }
		);
		this.currentStatus.nytCounties = parsedCountyData.map(numericalStats);
		this.currentStatus.nytStates = parsedStateData.map(numericalStats);
		this.currentStatus.nytNationwide = parsedNationData.map(numericalStats);
		logger.info('NYT local cache updated');
	} catch (err) {
		logger.err('Local NYT cache update failed', err);
	}
};

