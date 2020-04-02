// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/country_utils');
const stringUtils = require('../utils/string_utils');

const { redis, config } = require('./instances');
const { keys } = config;

router.get('/countries', async (req, res) => {
	const { sort } = req.query;
	let countries = JSON.parse(await redis.get(keys.countries));
	if (sort) {
		countries = countries.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(countries);
});

router.get('/countries/:query', async (req, res) => {
	const countries = JSON.parse(await redis.get(keys.countries));
	const { query } = req.params;
	/* eslint-disable-next-line no-restricted-globals */
	const isText = isNaN(query);
	const countryInfo = isText ? countryUtils.getCountryData(query) : null;
	const standardizedCountryName = stringUtils.wordsStandardize(countryInfo && countryInfo.country ? countryInfo.country : query);

	const country = countries.find((ctry) => {
		// either name or ISO
		if (isText) {
			// check for strict param
			if (req.query.strict) {
				return req.query.strict.toLowerCase() === 'true'
					? stringUtils.wordsStandardize(ctry.country) === standardizedCountryName
					: stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName);
			}
			return (
				(ctry.countryInfo.iso3 || 'null').toLowerCase() === query.toLowerCase()
				|| (ctry.countryInfo.iso2 || 'null').toLowerCase() === query.toLowerCase()
				|| ((query.length > 3 || countryUtils.isCountryException(query.toLowerCase()))
					&& stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName))
			);
		}
		// number, must be country ID
		return ctry.countryInfo._id === Number(query);
	});
	if (country) {
		res.send(country);
		return;
	}
	// adding status code 404 not found and sending response
	res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
});

router.get('/all', async (req, res) => {
	const all = JSON.parse(await redis.get(keys.all));
	const countries = JSON.parse(await redis.get(keys.countries));
	all.affectedCountries = countries.length;
	res.send(all);
});

router.get('/states', async (req, res) => {
	const states = JSON.parse(await redis.get(keys.states));
	res.send(states);
});

router.get('/yesterday', async (req, res) => {
	const yesterday = JSON.parse(await redis.get(keys.yesterday));
	res.send(yesterday);
});

module.exports = router;
