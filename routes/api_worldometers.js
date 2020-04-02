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
	const data = JSON.parse(await redis.get(keys.countries));
	const { query } = req.params;
	const countries = query.split(',');
	const countryData = [];

	// For each country param, find the country that matches the param
	for (const country of countries) {
		/* eslint-disable-next-line no-restricted-globals */
		const isText = isNaN(country);
		const countryInfo = isText ? countryUtils.getCountryData(country) : null;
		const standardizedCountryName = stringUtils.wordsStandardize(countryInfo && countryInfo.country ? countryInfo.country : country);

		const foundCountry = data.find((ctry) => {
			// either name or ISO
			if (isText) {
				// check for strict param
				if (req.query.strict) {
					return req.query.strict.toLowerCase() === 'true'
						? stringUtils.wordsStandardize(ctry.country) === standardizedCountryName
						: stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName);
				}
				return (
					(ctry.countryInfo.iso3 || 'null').toLowerCase() === country.toLowerCase()
					|| (ctry.countryInfo.iso2 || 'null').toLowerCase() === country.toLowerCase()
					|| ((country.length > 3 || countryUtils.isCountryException(country.toLowerCase()))
						&& stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName))
				);
			}
			// number, must be country ID
			return ctry.countryInfo._id === Number(country);
		});

		countryData.push(foundCountry || { message: 'Country not found or doesn\'t have any cases' });
	}

	if (countryData) {
		res.send(countryData.length === 1 ? countryData[0] : countryData);
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
