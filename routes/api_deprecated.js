// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/historical', async (req, res) => {
	res.send({ message: 'Deprecated, use /v2/historical' });
});

router.get('/historical/:country', async (req, res) => {
	res.send({ message: 'Deprecated, use /v2/historical' });
});

module.exports = router;
