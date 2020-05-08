// eslint-disable-next-line new-cap
const router = require('express').Router();
// const countryUtils = require('../utils/countryUtils');
const { redis, keys } = require('./instances');

router.get('/v2/gov/', async (req, res) => res.send(JSON.parse(await redis.get(keys.gov_countries))));

module.exports = router;
