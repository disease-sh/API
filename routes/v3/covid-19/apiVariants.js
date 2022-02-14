// eslint-disable-next-line new-cap
const router = require('express').Router();

const nameUtils = require('../../../utils/nameUtils');
const { wordToBoolean } = require('../../../utils/stringUtils');
const { redis, keys } = require('../../instances');

router.get('/v3/covid-19/variants/countries/:country?', async (req, res) => {
	const { allowNull } = req.query;
	const { country: countryName } = req.params;
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
