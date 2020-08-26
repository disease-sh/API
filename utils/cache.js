/*
Local cache to avoid unnecessary JSON parsing during data retrieval
Status of cache will update every time data is successfully scraped
*/
const logger = require('./logger');

var currentStatus = {
	nytCounties: undefined,
	nytStates: undefined,
	nytNationwide: undefined,
	appleData: undefined
};

const calculatePriorDate = (lastDays) => {
	var priorDate = new Date();
	priorDate.setDate(priorDate.getDate() - lastDays);
	return priorDate.toISOString().slice(0, 10);
};

// Series of get calls to retrieve current state of cache
/**
 * Parses NYT Counties data
 * @param 	{string}	lastdays  	How many days to show always take lastest
 * @param   {string}    key         Uses the dynamic redis keys sned by api on runtime
 * @returns {Array}				    The filtered historical data.
 */
exports.nytCounties = async (lastdays = 30, key) => {
	const nytdata = await fetchNYTCache(key);
	if (lastdays === 'all') {
		return nytdata;
	} else {
		const priorDate = calculatePriorDate(lastdays);
		return nytdata.filter((data) => data.date >= priorDate);
	}
};

exports.nytStates = async (lastdays = 30, key) => {
	const nytdata = await fetchNYTCache(key);
	if (lastdays === 'all') {
		return nytdata;
	} else {
		const priorDate = calculatePriorDate(lastdays);
		return nytdata.filter((data) => data.date >= priorDate);
	}
};

exports.nytNationwide = async (key) => await fetchNYTCache(key);

exports.appleData = async () => await fetchAppleData();

const fetchNYTCache = async (key) => {
	var parsedData = '';
	try {
		const { redis } = require('../routes/instances');
		parsedData = JSON.parse(await redis.get(key));
		const numericalStats = (element) => ({ ...element, deaths: parseInt(element.deaths), cases: parseInt(element.cases), updated: Date.now() });
		parsedData = parsedData.map(numericalStats);
		logger.info('NYT Cache Data Fetched');
	} catch (err) {
		logger.err('Local NYT cache fetch failed', err);
	}
	return parsedData;
};

const fetchAppleData = async () => {
	var parsedAppleData = '';
	try {
		const { redis, keys } = require('../routes/instances');
		parsedAppleData = JSON.parse(await redis.get(keys.apple_all));
		const numericalStats = (element) => ({ ...element, driving: parseFloat(element.driving), transit: parseFloat(element.transit), walking: parseFloat(element.walking) });
		if (!parsedAppleData) {
			logger.warn('Could not fetch Apple data from cache, no error.');
		} else {
			// eslint-disable-next-line no-return-assign
			Object.keys(parsedAppleData).forEach((countryName) => parsedAppleData[countryName].data = parsedAppleData[countryName].data.map(numericalStats));
			logger.info('Apple Cache Data Fetched');
		}
	} catch (err) {
		logger.err('Local Apple Data Fetch failed', err);
	}
	return parsedAppleData;
};

// Retrieves NYT data from Redis and stores it locally when data is updated
/* exports.updateNYTCache = async () => {
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
			const numericalStats = (element) => ({ ...element, deaths: parseInt(element.deaths), cases: parseInt(element.cases), updated: Date.now() });
			currentStatus.nytCounties = parsedCountyData.map(numericalStats);
			currentStatus.nytStates = parsedStateData.map(numericalStats);
			currentStatus.nytNationwide = parsedNationData.map(numericalStats);
			// Adding this log to as to see the updated data in the interval
			logger.info(`NYT county cache length: ${currentStatus.nytCounties.length}`);
			logger.info(`NYT state cache length: ${currentStatus.nytStates.length}`);
			logger.info('NYT local cache updated');
		}
	} catch (err) {
		logger.err('Local NYT cache update failed', err);
	}
}; */

// Retrieves Apple data from Redis and stores it locally when data is updated
/* exports.updateAppleCache = async () => {
	try {
		const { redis, keys } = require('../routes/instances');
		const parsedAppleData = JSON.parse(await redis.get(keys.apple_all));
		const numericalStats = (element) => ({ ...element, driving: parseFloat(element.driving), transit: parseFloat(element.transit), walking: parseFloat(element.walking) });
		if (!parsedAppleData) {
			logger.warn('Could not update Apple cache, no error.');
		} else {
			// eslint-disable-next-line no-return-assign
			Object.keys(parsedAppleData).forEach((countryName) => parsedAppleData[countryName].data = parsedAppleData[countryName].data.map(numericalStats));
			currentStatus.appleData = parsedAppleData;
			logger.info('Apple local cache updated');
		}
	} catch (err) {
		logger.err('Local Apple cache update failed', err);
	}
}; */
