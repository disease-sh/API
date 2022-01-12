// *from here* This model comes from apiGov.js:

// eslint-disable-next-line new-cap
const router = require('express').Router();

const nameUtils = require('../../../utils/nameUtils');
const { wordToBoolean } = require('../../../utils/stringUtils');
const { redis, keys } = require('../../instances');

router.get('/v3/covid-19/variants/countries/:query', async (req, res) => {
	const { allowNull } = req.query;
	const { country: countryName, yearWeek, variant  } = req.params;
	if (countryName) {
		const standardizedCountryName = nameUtils.getCountryData(countryName.trim()).country || countryName.trim();
		const data = JSON.parse(await redis.hget(keys.variants, standardizedCountryName));
		if (data) {
			res.send(!wordToBoolean(allowNull) ? nameUtils.transformNull(data) : data);
		} else {
			res.status(404).send({ message: `Country '${standardizedCountryName}' not found or no data found for country` });
		}
	} else {
		res.send((await redis.hkeys(keys.variants)).sort());
	}
});

module.exports = router;

// *to here*

// Take this code below as an example:
// router.get('/v3/covid-19/countries/:query', async (req, res) => {
// 	const { yesterday, twoDaysAgo, strict, allowNull } = req.query;
// 	const { query } = req.params;
// 	let countries = JSON.parse(await redis.get(wordToBoolean(yesterday) ? keys.yesterday_countries : wordToBoolean(twoDaysAgo) ? keys.twoDaysAgo_countries : keys.countries))
// 		.filter(country => country.country.toLowerCase() !== 'world').map(fixApostrophe);
// 	countries = splitQuery(query)
// 		.map(country => nameUtils.getWorldometersData(countries, country, strict !== 'false'))
// 		.filter(value => value).map(country => !wordToBoolean(allowNull) ? nameUtils.transformNull(country) : country);
// 	if (countries.length > 0) res.send(countries.length === 1 ? countries[0] : countries);
// 	else res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
// });
