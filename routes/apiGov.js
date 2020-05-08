// eslint-disable-next-line new-cap
const router = require('express').Router();
// const countryUtils = require('../utils/countryUtils');
const { redis, keys } = require('./instances');

router.get('/v2/gov/', async (req, res) => {
	const countries = JSON.parse(await redis.get(keys.gov_countries));
	res.send(countries);
});

module.exports = router;
