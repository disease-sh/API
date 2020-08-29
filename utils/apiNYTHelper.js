const logger = require('./logger');

const calculatePriorDate = (lastDays) => {
	var priorDate = new Date();
	priorDate.setDate(priorDate.getDate() - lastDays);
	return priorDate.toISOString().slice(0, 10);
};

// Series of get calls to retrieve current state of redis cache
const nytCounties = async (lastdays = 30, key, redis) => {
	const nytdata = await fetchNYTCache(key, redis);
	if (lastdays === 'all') {
		return nytdata;
	} else {
		const priorDate = calculatePriorDate(lastdays);
		return nytdata.filter((data) => data.date >= priorDate);
	}
};

const nytStates = async (lastdays = 30, key, redis) => {
	const nytdata = await fetchNYTCache(key, redis);
	if (lastdays === 'all') {
		return nytdata;
	} else {
		const priorDate = calculatePriorDate(lastdays);
		return nytdata.filter((data) => data.date >= priorDate);
	}
};

const nytNationwide = async (key, redis) => await fetchNYTCache(key, redis);

const fetchNYTCache = async (key, redis) => {
	var parsedData = '';
	try {
		parsedData = JSON.parse(await redis.get(key));
		const numericalStats = (element) => ({ ...element, deaths: parseInt(element.deaths), cases: parseInt(element.cases), updated: Date.now() });
		parsedData = parsedData.map(numericalStats);
	} catch (err) {
		logger.err('NYT redis fetch failed', err);
	}
	return parsedData;
};

module.exports = {
	nytCounties,
	nytStates,
	nytNationwide
};
