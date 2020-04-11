// eslint-disable-next-line new-cap
const router = require('express').Router();
const { wordToBoolean, splitQuery } = require('../utils/string_utils');
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
	const worldData = countries.find(country => country.country.toLowerCase() === 'world');
	delete worldData.country;
	delete worldData.countryInfo;
	worldData.affectedCountries = countries.splice(1).length;
	return worldData;
};

const fixApostrophe = (country) => {
	country.country = country.country.replace(/"/g, '\'');
	return country;
};

router.get('/all', async (req, res) => res.send(await getAllData(keys.countries)));

router.get('/countries', async (req, res) => {
	const { sort } = req.query;
	let countries = JSON.parse(await redis.get(keys.countries)).splice(1).map(fixApostrophe);
	if (sort) {
		countries = countries.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(countries);
});

router.get('/countries/:query', async (req, res) => {
	const { strict } = req.query;
	const { query } = req.params;
	const countries = JSON.parse(await redis.get(keys.countries)).map(fixApostrophe);
	const countryData = splitQuery(query)
		.map(country => countryUtils.getCountryWorldometersData(countries, country, strict === 'true'))
		.filter(value => value);
	if (countryData.length > 0) {
		res.send(countryData.length === 1 ? countryData[0] : countryData);
	} else {
		res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
	}
});

router.get('/states', async (req, res) => {
	const { sort } = req.query;
	let states = JSON.parse(await redis.get(keys.states)).splice(1);
	if (sort) {
		states = states.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(states);
});

router.get('/states/:query', async (req, res) => {
	const { query } = req.params;
	const states = JSON.parse(await redis.get(keys.states));
	const stateData = splitQuery(query)
		.map(state => states.find(state2 => state.toLowerCase() === state2.state.toLowerCase()))
		.filter(value => value);
	if (stateData.length > 0) {
		res.send(stateData.length === 1 ? stateData[0] : stateData);
	} else {
		res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
	}
});

router.get('/yesterday', async (req, res) => {
	const { sort } = req.query;
	let yesterday = JSON.parse(await redis.get(keys.yesterday)).splice(1).map(fixApostrophe);
	if (sort) {
		yesterday = yesterday.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(yesterday);
});

router.get('/yesterday/all', async (req, res) => res.send(await getAllData(keys.yesterday)));

router.get('/yesterday/:query', async (req, res) => {
	const { strict } = req.query;
	const { query } = req.params;
	const countries = JSON.parse(await redis.get(keys.yesterday)).map(fixApostrophe);
	const yesterdayCountryData = splitQuery(query)
		.map(country => countryUtils.getCountryWorldometersData(countries, country, strict === 'true'))
		.filter(value => value);
	if (yesterdayCountryData.length > 0) {
		res.send(yesterdayCountryData.length === 1 ? yesterdayCountryData[0] : yesterdayCountryData);
	} else {
		res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
	}
});


// ROUTER V2
router.get('/v2/all', async (req, res) => res.send(await getAllData(wordToBoolean(req.query.yesterday) ? keys.yesterday : keys.countries)));

router.get('/v2/countries', async (req, res) => {
	const { sort, yesterday } = req.query;
	let countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday : keys.countries)).splice(1).map(fixApostrophe);
	if (sort) countries = countries.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	res.send(countries);
});

router.get('/v2/countries/:query', async (req, res) => {
	const { yesterday, strict } = req.query;
	const { query } = req.params;
	let countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday : keys.countries)).splice(1).map(fixApostrophe);
	countries = splitQuery(query)
		.map(country => countryUtils.getCountryWorldometersData(countries, country, strict !== 'false'))
		.filter(value => value);
	if (countries.length > 0) res.send(countries.length === 1 ? countries[0] : countries);
	else res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
});

module.exports = router;
