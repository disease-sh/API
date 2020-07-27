// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('../../instances');

router.get('/v3/covid-19/vaccine', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine));
	if (data) {
		res.send(data);
	} else {
		res.status(404).send({ message: `Error fetching vaccine data` });
	}
});

module.exports = router;
