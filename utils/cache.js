/*
Local cache to avoid unnecessary JSON parsing during data retrieval
Status of cache will update every time data is successfully scraped
*/
const logger = require('./logger');

exports.currentStatus = {
	nytCounties: undefined,
	nytStates: undefined,
	nytNationwide: undefined,
	appleData: undefined
};

// Series of get calls to retrieve current state of cache
/**
 * Parses NYT Counties data
 * @param 	{string}	lastdays  	How many days to show always take lastest
 * @returns {Array}				The filtered historical data.
 */
exports.nytCounties = (lastdays = 30) => {
	if (lastdays === 'all') {
		return this.currentStatus.nytCounties;
	} else {
		var priorDate = new Date();
		priorDate.setDate(priorDate.getDate() - lastdays);
		priorDate = priorDate.toISOString().slice(0, 10);
		const priorData = [];
		this.currentStatus.nytCounties.forEach((data) => {
			if (data.date >= priorDate) {
				priorData.push(data);
			}
		});
		return priorData;
	}
};
exports.nytStates = () => this.currentStatus.nytStates;
exports.nytNationwide = () => this.currentStatus.nytNationwide;
exports.appleData = () => this.currentStatus.appleData;

// Retrieves NYT data from Redis and stores it locally when data is updated
exports.updateNYTCache = async () => {
	try {
		const { redis, keys } = require('../routes/instances');
		const [parsedCountyData, parsedStateData, parsedNationData] = await Promise.all([
			keys.nyt_counties,
			keys.nyt_states,
			keys.nyt_USA
		].map(async (key) => JSON.parse(await redis.get(key))));
		if (!(parsedCountyData && parsedStateData && parsedNationData)) {
			logger.warn('Could not update NYT cache, no error.');
		} else {
			const numericalStats = (element) => ({ ...element, deaths: parseInt(element.deaths), cases: parseInt(element.cases) });
			this.currentStatus.nytCounties = parsedCountyData.map(numericalStats);
			this.currentStatus.nytStates = parsedStateData.map(numericalStats);
			this.currentStatus.nytNationwide = parsedNationData.map(numericalStats);
			logger.info('NYT local cache updated');
		}
	} catch (err) {
		logger.err('Local NYT cache update failed', err);
	}
};

// Retrieves Apple data from Redis and stores it locally when data is updated
exports.updateAppleCache = async () => {
	try {
		const { redis, keys } = require('../routes/instances');
		const parsedAppleData = JSON.parse(await redis.get(keys.apple_all));
		const numericalStats = (element) => ({ ...element, driving: parseFloat(element.driving), transit: parseFloat(element.transit), walking: parseFloat(element.walking) });
		if (!parsedAppleData) {
			logger.warn('Could not update Apple cache, no error.');
		} else {
			// eslint-disable-next-line no-return-assign
			Object.keys(parsedAppleData).forEach((countryName) => parsedAppleData[countryName].data = parsedAppleData[countryName].data.map(numericalStats));
			this.currentStatus.appleData = parsedAppleData;
			logger.info('Apple local cache updated');
		}
	} catch (err) {
		logger.err('Local Apple cache update failed', err);
	}
};
