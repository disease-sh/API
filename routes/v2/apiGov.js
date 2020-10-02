// eslint-disable-next-line new-cap
const router = require('express').Router();

const nameUtils = require('../../utils/nameUtils');
const { wordToBoolean } = require('../../utils/stringUtils');
const { redis, keys } = require('../instances');

router.get('/v2/gov/:country?', async (req, res) => {
	const { allowNull } = req.query;
	const { country: countryName } = req.params;
	if (countryName) {
		const standardizedCountryName = nameUtils.getCountryData(countryName.trim()).country || countryName.trim();
		const data = JSON.parse(await redis.hget(keys.gov_countries, standardizedCountryName));
		if (data) {
			res.send(!wordToBoolean(allowNull) ? nameUtils.transformNull(data) : data);
		} else {
			res.status(404).send({ message: `Country '${standardizedCountryName}' not found or no data found for country` });
		}
	} else {
		res.send((await redis.hkeys(keys.gov_countries)).sort());
	}
});

module.exports = router;
