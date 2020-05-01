// eslint-disable-next-line new-cap
const router = require('express').Router();
const { appleData } = require('../utils/apple_cache');

router.get('/v2/apple/countries', async (req, res) => {
	const data = appleData();
	res.send(Object.keys(data));
});

router.get('/v2/apple/countries/:country', async (req, res) => {
	const { country: queryCountry } = req.params;
	const data = appleData();
	if (queryCountry) {
		const countryArr = queryCountry.trim().split(/,[\s+?]/);
		console.log(countryArr);
		const countryData = countryArr.map((countryName) => data[countryName]);
		// eslint-disable-next-line no-unused-expressions
		countryData.length > 0
			? res.send(countryData)
			: res.status(404).send({ message: 'Country not found or no data found for county' });
	} else {
		res.status(404).send({ message: 'Country not found or no data found for county' });
	}
});

module.exports = router;
