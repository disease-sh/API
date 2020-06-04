// eslint-disable-next-line new-cap
const router = require('express').Router();
const { wordToBoolean, splitQuery, fixApostrophe } = require('../../utils/stringUtils');
const countryUtils = require('../../utils/countryUtils');
const { redis, keys } = require('../instances');

router.get('/v2/all', async (req, res) => {
	const { yesterday, twoDaysAgo, allowNull } = req.query;
	res.redirect(`/v3/covid19/all?yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&allowNull=${allowNull}`);
});

router.get('/v2/countries', async (req, res) => {
	const { sort, yesterday, twoDaysAgo, allowNull } = req.query;
	res.redirect(`/v3/covid19/countries?sort=${sort}&yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&allowNull=${allowNull}`);
});

router.get('/v2/countries/:query', async (req, res) => {
	const { yesterday, twoDaysAgo, strict, allowNull } = req.query;
	const { query } = req.params;
	res.redirect(`/v3/covid19/countries/${query || ''}?yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&strict=${strict}&allowNull=${allowNull}`);
});

router.get('/v2/continents', async (req, res) => {
	const { sort, yesterday, twoDaysAgo, allowNull } = req.query;
	const countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries));
	const continents = await Promise.all(JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_continents : keys.continents))
		.map(continent => ({ ...continent, countries: countryUtils.getCountriesFromContinent(continent.continent, countries) }))
		.map(continent => !wordToBoolean(allowNull) ? countryUtils.transformNull(continent) : continent));
	res.send(sort ? continents.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : continents);
});

router.get('/v2/continents/:query', async (req, res) => {
	const { yesterday, twoDaysAgo, strict, allowNull } = req.query;
	const { query } = req.params;
	const continents = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_continents : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_continents : keys.continents));
	const continent = countryUtils.getWorldometersData(continents, query, strict !== 'false', true);
	if (continent) {
		continent.countries = countryUtils.getCountriesFromContinent(continent.continent,
			JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries)));
		res.send(!wordToBoolean(allowNull) ? countryUtils.transformNull(continent) : continent);
	} else {
		res.status(404).send({ message: 'Continent not found or doesn\'t have any cases' });
	}
});

router.get('/v2/states', async (req, res) => {
	const { sort, yesterday, allowNull } = req.query;
	const states = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_states : keys.states))
		.splice(1).map(state => !wordToBoolean(allowNull) ? countryUtils.transformNull(state) : state);
	res.send(sort ? states.sort((a, b) => a[sort] > b[sort] ? -1 : 1) : states);
});

router.get('/v2/states/:query', async (req, res) => {
	const { yesterday, allowNull } = req.query;
	const { query } = req.params;
	const states = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_states : keys.states)).splice(1);
	const stateData = splitQuery(query)
		.map(state => states.find(state2 => state.toLowerCase() === state2.state.toLowerCase()))
		.filter(value => value).map(state => !wordToBoolean(allowNull) ? countryUtils.transformNull(state) : state);
	if (stateData.length > 0) {
		res.send(stateData.length === 1 ? stateData[0] : stateData);
	} else {
		res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
	}
});

module.exports = router;
