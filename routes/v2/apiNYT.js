// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/v2/nyt/states', async (req, res) => res.redirect('/v3/covid-19/nyt/states'));

router.get('/v2/nyt/states/:state', async (req, res) => {
	const { state: queryState } = req.params;
	res.redirect(`/v3/covid-19/nyt/states/${queryState || ''}`);
});

router.get('/v2/nyt/counties', async (req, res) => res.redirect('/v3/covid-19/nyt/counties'));

router.get('/v2/nyt/counties/:county', async (req, res) => {
	const { county: queryCounty } = req.params;
	res.redirect(`/v3/covid-19/nyt/counties/${queryCounty || ''}`);
});

router.get('/v2/nyt/usa', async (req, res) => res.redirect('/v3/covid-19/nyt/usa'));

module.exports = router;
