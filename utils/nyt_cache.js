/*
Local cache to avoid unnecessary JSON parsing during NYT data retrieval
Status of cache will update every time data is successfully scraped
*/


exports.currentStatus = {
	nytCounties: undefined,
	nytStates: undefined,
	nytNationwide: undefined
};

// Series of get calls to retrieve current state of cache
exports.nytCounties = () => this.currentStatus.nytCounties;
exports.nytStates = () => this.currentStatus.nytStates;
exports.nytNationwide = () => this.currentStatus.nytNationwide;

exports.updateCache = async () => {
	const { redis, keys } = require('../routes/instances');
	const [parsedCountyData, parsedStateData, parsedNationData] = await Promise.all([
		keys.nyt_counties,
		keys.nyt_states,
		keys.nyt_nationwide
	].map(async (key) => JSON.parse(await redis.get(key))));
	this.currentStatus.nytCounties = parsedCountyData;
	this.currentStatus.nytStates = parsedStateData;
	this.currentStatus.nytNationwide = parsedNationData;
};

