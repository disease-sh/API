// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('./instances');

router.get('/v2/ebola', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.ebola));
	res.send(data);
});

module.exports = router;
