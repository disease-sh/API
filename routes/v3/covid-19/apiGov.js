// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../../../utils/countryUtils');
const { wordToBoolean } = require('../../../utils/stringUtils');
const { redis, keys } = require('../../instances');

router.get('/v3/covid-19/gov/:country?', async (req, res) => {
	const { allowNull } = req.query;
	const { country: countryName } = req.params;
	const data = JSON.parse(await redis.get(keys.gov_countries));
	if (countryName) {
		const standardizedCountryName = countryUtils.getCountryData(countryName.trim()).country || countryName.trim();
		if (data[standardizedCountryName]) {
			res.send(!wordToBoolean(allowNull) ? countryUtils.transformNull(data[standardizedCountryName]) : data[standardizedCountryName]);
		} else {
			res.status(404).send({ message: `Country '${standardizedCountryName}' not found or no data found for country` });
		}
	} else {
		res.send(Object.keys(data));
	}
});

module.exports = router;
