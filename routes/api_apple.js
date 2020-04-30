// eslint-disable-next-line new-cap
const router = require('express').Router();
const { appleData } = require('../utils/apple_cache');

router.get('/v2/apple/countries', async (req, res) => {
	const data = [...new Set(appleData().map((element) => element.country))];
	res.send(data);
});

router.get('/v2/apple/countries/:country', async (req, res) => {
	const { country: queryCountry } = req.params;
	const data = appleData();
	if (queryCountry) {
		const countryArr = queryCountry.trim().split(/,[\s+?]/).map((country) => country.toLowerCase());
		const countryData = data.filter((element) => countryArr.includes(element.country.toLowerCase()));
		// eslint-disable-next-line no-unused-expressions
		countryData.length > 0
			? res.send(countryData)
			: res.status(404).send({ message: 'Country not found or no data found for county' });
	} else {
		res.status(404).send({ message: 'Country not found or no data found for county' });
	}
});

module.exports = router;
