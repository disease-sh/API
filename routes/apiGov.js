// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/countryUtils');
const { redis, keys } = require('./instances');

router.get('/v2/gov/:country?', async (req, res) => {
	const { country: countryName } = req.params;
	const data = JSON.parse(await redis.get(keys.gov_countries));
	if (countryName) {
		const standardizedCountryName = countryUtils.getCountryData(countryName.trim()).country || countryName.trim();
		if (data[standardizedCountryName]) {
			res.send(data[standardizedCountryName]);
		} else {
			res.status(404).send({ message: `Country '${standardizedCountryName}' not found or no data found for county` });
		}
	} else {
		res.send(Object.keys(data));
	}
});

module.exports = router;
