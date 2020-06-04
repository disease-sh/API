// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/v2/all', async (req, res) => {
	const { yesterday, twoDaysAgo, allowNull } = req.query;
	res.redirect(`/v3/covid19/all?yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&allowNull=${allowNull}`);
});

router.get('/v2/countries', async (req, res) => {
	const { sort, yesterday, twoDaysAgo, allowNull } = req.query;
	res.redirect(`/v3/covid19/countries?sort=${sort}&yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&allowNull=${allowNull}`);
});

router.get('/v2/countries/:query', async (req, res) => {
	const { yesterday, twoDaysAgo, strict, allowNull } = req.query;
	const { query } = req.params;
	res.redirect(`/v3/covid19/countries/${query || ''}?yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&strict=${strict}&allowNull=${allowNull}`);
});

router.get('/v2/continents', async (req, res) => {
	const { sort, yesterday, twoDaysAgo, allowNull } = req.query;
	res.redirect(`/v3/covid19/continents?sort=${sort}&yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&allowNull=${allowNull}`);
});

router.get('/v2/continents/:query', async (req, res) => {
	const { yesterday, twoDaysAgo, strict, allowNull } = req.query;
	const { query } = req.params;
	res.redirect(`/v3/covid19/continents/${query || ''}?yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&strict=${strict}&allowNull=${allowNull}`);
});

router.get('/v2/states', async (req, res) => {
	const { sort, yesterday, allowNull } = req.query;
	res.redirect(`/v3/covid19/states?sort=${sort}&yesterday=${yesterday}&allowNull=${allowNull}`);
});

router.get('/v2/states/:query', async (req, res) => {
	const { yesterday, allowNull } = req.query;
	const { query } = req.params;
	res.redirect(`/v3/covid19/states/${query || ''}?yesterday=${yesterday}&allowNull=${allowNull}`);
});

module.exports = router;
