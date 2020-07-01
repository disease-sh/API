// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('../../instances');

router.get('/v3/influenza/CDC/ILINet', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.influenza_ILINET));
	res.send(data);
});

router.get('/v3/influenza/CDC/USPHL', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.influenza_USPHL));
	res.send(data);
});

router.get('/v3/influenza/CDC/USCL', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.influenza_USCL));
	res.send(data);
});

module.exports = router;
