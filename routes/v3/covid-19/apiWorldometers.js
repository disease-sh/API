// eslint-disable-next-line new-cap
const router = require('express').Router();
const { wordToBoolean, splitQuery, fixApostrophe } = require('../../../utils/stringUtils');
const nameUtils = require('../../../utils/nameUtils');
const { redis, keys } = require('../../instances');

/**
 * Gets data for /all or /yesterday/all endpoint
 * @param 	{string}	key 	Appropriate redis key
 * @returns {Object} 			Global data
 */
const getAllData = async (key) => {
	const countries = JSON.parse(await redis.get(key));
	const worldData = countries.find(countryData => countryData.country.toLowerCase() === 'world');
	worldData.affectedCountries = countries.length - 1;
	// eslint-disable-next-line no-unused-vars
	const { country, countryInfo, continent, ...cleanedWorldData } = worldData;
	return cleanedWorldData;
};

router.get('/v3/covid-19/all', async (req, res) => {
	const { yesterday, twoDaysAgo, allowNull } = req.query;
	const data = await getAllData(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries);
	res.send(!wordToBoolean(allowNull) ? nameUtils.transformNull(data) : data);
});

router.get('/v3/covid-19/countries', async (req, res) => {
	const { sort, yesterday, twoDaysAgo, allowNull } = req.query;
	const countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries))
		.filter(country => country.country.toLowerCase() !== 'world').map(fixApostrophe).map(country => !wordToBoolean(allowNull) ? nameUtils.transformNull(country) : country);
	res.send(sort ? countries.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : countries);
});

router.get('/v3/covid-19/countries/:query', async (req, res) => {
	const { yesterday, twoDaysAgo, strict, allowNull } = req.query;
	const { query } = req.params;
	let countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries))
		.filter(country => country.country.toLowerCase() !== 'world').map(fixApostrophe);
	countries = splitQuery(query)
		.map(country => nameUtils.getWorldometersData(countries, country, strict !== 'false'))
		.filter(value => value).map(country => !wordToBoolean(allowNull) ? nameUtils.transformNull(country) : country);
	if (countries.length > 0) res.send(countries.length === 1 ? countries[0] : countries);
	else res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
});

router.get('/v3/covid-19/continents', async (req, res) => {
	const { sort, yesterday, twoDaysAgo, allowNull } = req.query;
	const countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries));
	const continents = await Promise.all(JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_continents : keys.continents))
		.map(continent => ({ ...continent, continentInfo: nameUtils.getContinentData(continent.continent), countries: nameUtils.getCountriesFromContinent(continent.continent, countries) }))
		.map(continent => !wordToBoolean(allowNull) ? nameUtils.transformNull(continent) : continent));
	res.send(sort ? continents.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : continents);
});

router.get('/v3/covid-19/continents/:query', async (req, res) => {
	const { yesterday, twoDaysAgo, strict, allowNull } = req.query;
	const { query } = req.params;
	const countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries));
	let continents = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_continents : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_continents : keys.continents));
	continents = splitQuery(query)
		.map(continent => nameUtils.getWorldometersData(continents, continent, strict !== 'false', true))
		.filter(value => value)
		.map(continent => ({
			...continent,
			continentInfo: nameUtils.getContinentData(continent.continent),
			countries: nameUtils.getCountriesFromContinent(continent.continent, countries)
		})).map(continent => !wordToBoolean(allowNull) ? nameUtils.transformNull(continent) : continent);
	if (continents.length > 0) res.send(continents.length === 1 ? continents[0] : continents);
	else res.status(404).send({ message: 'Continent not found or doesn\'t have any cases' });
});

router.get('/v3/covid-19/states', async (req, res) => {
	const { sort, yesterday, allowNull } = req.query;
	const states = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_states : keys.states))
		.splice(1).map(state => !wordToBoolean(allowNull) ? nameUtils.transformNull(state) : state);
	res.send(sort ? states.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : states);
});

router.get('/v3/covid-19/states/:query', async (req, res) => {
	const { yesterday, allowNull } = req.query;
	const { query } = req.params;
	const states = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_states : keys.states)).splice(1);
	const stateData = splitQuery(query)
		.map(state => states.find(state2 => state.toLowerCase() === state2.state.toLowerCase()))
		.filter(value => value).map(state => !wordToBoolean(allowNull) ? nameUtils.transformNull(state) : state);
	if (stateData.length > 0) {
		res.send(stateData.length === 1 ? stateData[0] : stateData);
	} else {
		res.status(404).send({ message: 'State not found or doesn\'t have any cases' });
	}
});

module.exports = router;
