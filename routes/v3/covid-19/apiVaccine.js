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

router.get('/v3/covid-19/vaccine/coverage', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine_coverage));
	if (data) {
		res.send(data);
	} else {
		res.status(404).send({ message: `Error fetching vaccine coverage data` });
	}
});
module.exports = router;
