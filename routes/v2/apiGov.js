// eslint-disable-next-line new-cap
const router = require('express').Router();

const nameUtils = require('../../utils/nameUtils');
const { wordToBoolean } = require('../../utils/stringUtils');
const { redis, keys } = require('../instances');

router.get('/v2/gov/:country?', async (req, res) => {
	const { allowNull } = req.query;
	const { country: countryName } = req.params;

	res.redirect(`/v3/covid-19/gov/${countryName || ''}`);
});

module.exports = router;
