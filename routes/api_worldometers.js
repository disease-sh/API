// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/country_utils');
const { redis, config } = require('./instances');
const { keys } = config;

/**
 * Gets data for /all or /yesterday/all endpoint
 * @param 	{string}	key 	Appropriate redis key
 * @returns {Object} 			Global data
 */
const getAllData = async (key) => {
	const countries = JSON.parse(await redis.get(key));
	const worldData = countries[0];
	return {
		cases: worldData.cases,
		todayCases: worldData.todayCases,
		deaths: worldData.deaths,
		todayDeaths: worldData.todayDeaths,
		recovered: worldData.recovered,
		active: worldData.active,
		critical: worldData.critical,
		casesPerOneMillion: worldData.casesPerOneMillion,
		deathsPerOneMillion: worldData.deathsPerOneMillion,
		updated: worldData.updated,
		tests: worldData.tests,
		testsPerOneMillion: worldData.testsPerOneMillion,
		affectedCountries: countries.length
	};
};

router.get('/countries', async (req, res) => {
	const { sort } = req.query;
	let countries = JSON.parse(await redis.get(keys.countries));
	// ignore world row
	countries.shift();
	if (sort) {
		countries = countries.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(countries);
});

router.get('/countries/:query', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.countries));
	const { query } = req.params;
	const queriedCountries = query.split(',');
	const countryData = [];
	// For each country param, find the country that matches the param
	for (const country of queriedCountries) {
		const foundCountry = countryUtils.getCountryWorldometersData(data, country, req.query.strict === 'true');
		if (foundCountry) countryData.push(foundCountry);
	}
	if (countryData.length > 0) {
		res.send(countryData.length === 1 ? countryData[0] : countryData);
		return;
	}
	// adding status code 404 not found and sending response
	res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
});
router.get('/all', async (req, res) => {
	const all = await getAllData(keys.countries);
	res.send(all);
});

router.get('/states', async (req, res) => {
	const { sort } = req.query;
	let states = JSON.parse(await redis.get(keys.states));
	// ignore USA Total
	states.shift();
	if (sort) {
		states = states.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(states);
});
router.get('/states/:query', async (req, res) => {
	const { query } = req.params;
	const states = JSON.parse(await redis.get(keys.states));
	const stateData = states.find(st => st.state.toLowerCase() === query.toLowerCase());
	if (stateData) {
		res.send(stateData);
		return;
	}
	res.status(404).send({ message: 'State not found or doesn\'t have any cases' });
});
router.get('/yesterday', async (req, res) => {
	const { sort } = req.query;
	let yesterday = JSON.parse(await redis.get(keys.yesterday));
	yesterday.shift();
	if (sort) {
		yesterday = yesterday.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(yesterday);
});
router.get('/yesterday/all', async (req, res) => {
	const all = await getAllData(keys.yesterday);
	res.send(all);
});
router.get('/yesterday/:query', async (req, res) => {
	const yesterday = JSON.parse(await redis.get(keys.yesterday));
	const { query } = req.params;
	const queriedCountries = query.split(',');
	const yesterdayCountryData = [];

	yesterday.shift();
	// For each country param, find the country that matches the param
	for (const country of queriedCountries) {
		const foundCountry = countryUtils.getCountryWorldometersData(yesterday, country, req.query.strict === 'true');
		if (foundCountry) yesterdayCountryData.push(foundCountry);
	}
	if (yesterdayCountryData.length > 0) {
		res.send(yesterdayCountryData.length === 1 ? yesterdayCountryData[0] : yesterdayCountryData);
		return;
	}
	// adding status code 404 not found and sending response
	res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
});
module.exports = router;
