// eslint-disable-next-line new-cap
const router = require('express').Router();
const nameUtils = require('../../utils/nameUtils');
const { splitQuery } = require('../../utils/stringUtils');
const { appleData } = require('../../utils/cache');

router.get('/v2/apple/countries/:country?', async (req, res) => {
	const { country: countryName } = req.params;
	res.redirect(`/v3/covid-19/apple/countries/${countryName || ''}`)
});

router.get('/v2/apple/countries/:country/:subregions', async (req, res) => {
	const { country: countryName, subregions: querySubregions } = req.params;
	res.redirect(`/v3/covid-19/apple/countries/${countryName || ''}/${querySubregions || ''}`);
});

module.exports = router;
