// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('../../instances');

router.get('/v3/covid-19/therapeutics', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.therapeutics));
	if (data) {
		res.send(data);
	} else {
		res.status(404).send({ message: `Error fetching therapeutics data` });
	}
});

module.exports = router;
