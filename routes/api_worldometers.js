// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/country_utils');
const { redis, config } = require('./instances');
const { keys } = config;
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
	const countries = query.split(',');
	const countryData = [];
	// For each country param, find the country that matches the param
	for (const country of countries) {
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
	const countries = JSON.parse(await redis.get(keys.countries));
	const worldData = countries[0];
	const all = {
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
		affectedCountries: countries.length
	};
	res.send(all);
});
router.get('/states', async (req, res) => {
	const states = JSON.parse(await redis.get(keys.states));
	res.send(states);
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
module.exports = router;
