const logger = require('./logger');
const { redis } = require('../routes/instances');

const calculatePriorDate = async (key, lastDays, dateField) => {
	lastDays = parseInt(lastDays);
	const latest = JSON.parse(await redis.hget(key, dateField));
	const priorDate = new Date(latest);
	if (lastDays > 1) priorDate.setDate(priorDate.getDate() - (lastDays - 1));
	return priorDate.toISOString().slice(0, 10);
};

// Series of get calls to retrieve current state of redis cache
const nytCounties = async (lastdays = 30, key) => await controller(lastdays, key);
const nytStates = async (lastdays = 30, key) => await controller(lastdays, key);
const nytNationwide = async (lastdays = 'data', key) => await controller(lastdays, key);

const controller = async (lastdays, key) => {
	const nytdata = await fetchNYTCache(key, lastdays);
	if (lastdays === 'all') {
		return nytdata;
	} else {
		const priorDate = await calculatePriorDate(key, lastdays, 'latest');
		return await redis.hexists(key, lastdays)
			? nytdata
			: nytdata.filter((data) => data.date >= priorDate);
	}
};

const fetchNYTCache = async (key, lastdays) => {
	let parsedData = '';
	try {
		await redis.hexists(key, lastdays)
			? parsedData = JSON.parse(await redis.hget(key, lastdays))
			: parsedData = JSON.parse(await redis.hget(key, 'data'));
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
