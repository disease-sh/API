// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/v3/teapot', async (req, res) => {
	res.status(418).send({ message: 'I\'m a teapot!' });
});

module.exports = router;
