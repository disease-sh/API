// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('../../instances');
const countryUtils = require('../../../utils/countryUtils');
const { wordToBoolean } = require('../../../utils/stringUtils');

router.get('/v3/ebola/ecdc', async (req, res) => {
	const { allowNull } = req.query;
	const data = JSON.parse(await redis.get(keys.ebola_ecdc));
	res.send(!wordToBoolean(allowNull) ? countryUtils.transformNull(data) : data);
});

module.exports = router;
