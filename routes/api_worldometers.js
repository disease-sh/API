// eslint-disable-next-line new-cap
const router = require('express').Router();
const { wordToBoolean, splitQuery } = require('../utils/string_utils');
const countryUtils = require('../utils/country_utils');
const { redis, keys } = require('./instances');

/**
 * Gets data for /all or /yesterday/all endpoint
 * @param 	{string}	key 	Appropriate redis key
 * @returns {Object} 			Global data
 */
const getAllData = async (key) => {
	const countries = JSON.parse(await redis.get(key));
	const worldData = countries.find(country => country.country.toLowerCase() === 'world');
	worldData.affectedCountries = countries.filter(country => country.country.toLowerCase() !== 'world').length;
	// eslint-disable-next-line no-unused-vars
	const { country, countryInfo, continent, ...cleanedWorldData } = worldData;
	return cleanedWorldData;
};

const fixApostrophe = (country) => {
	country.country = country.country.replace(/"/g, '\'');
	return country;
};

router.get('/v2/all', async (req, res) => res.send(await getAllData(wordToBoolean(req.query.yesterday) ? keys.yesterday_countries : keys.countries)));

router.get('/v2/countries', async (req, res) => {
	const { sort, yesterday } = req.query;
	const countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : keys.countries))
		.filter(country => country.country.toLowerCase() !== 'world').map(fixApostrophe);
	res.send(sort ? countries.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : countries);
});

router.get('/v2/countries/:query', async (req, res) => {
	const { yesterday, strict } = req.query;
	const { query } = req.params;
	let countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : keys.countries))
		.filter(country => country.country.toLowerCase() !== 'world').map(fixApostrophe);
	countries = splitQuery(query)
		.map(country => countryUtils.getWorldometersData(countries, country, strict !== 'false'))
		.filter(value => value);
	if (countries.length > 0) res.send(countries.length === 1 ? countries[0] : countries);
	else res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
});

router.get('/v2/continents', async (req, res) => {
	const { sort, yesterday } = req.query;
	const countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : keys.countries));
	const continents = await Promise.all(JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_continents : keys.continents))
		.map(async continent => ({ ...continent, countries: countryUtils.getCountriesFromContinent(continent.continent, countries) })));
	res.send(sort ? continents.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : continents);
});

router.get('/v2/continents/:query', async (req, res) => {
	const { yesterday, strict } = req.query;
	const { query } = req.params;
	const continents = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_continents : keys.continents));
	const continent = countryUtils.getWorldometersData(continents, query, strict !== 'false', true);
	if (continent) {
		continent.countries = countryUtils.getCountriesFromContinent(continent.continent, JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : keys.countries)));
		res.send(continent);
	} else {
		res.status(404).send({ message: 'Continent not found or doesn\'t have any cases' });
	}
});

router.get('/v2/states', async (req, res) => {
	const { sort, yesterday } = req.query;
	const states = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_states : keys.states)).splice(1);
	res.send(sort ? states.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : states);
});

router.get('/v2/states/:query', async (req, res) => {
	const { yesterday } = req.query;
	const { query } = req.params;
	const states = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_states : keys.states)).splice(1);
	const stateData = splitQuery(query)
		.map(state => states.find(state2 => state.toLowerCase() === state2.state.toLowerCase()))
		.filter(value => value);
	if (stateData.length > 0) {
		res.send(stateData.length === 1 ? stateData[0] : stateData);
	} else {
		res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
	}
});

module.exports = router;
