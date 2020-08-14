// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/v2/historical', async (req, res) => {
	res.redirect('/v3/covid-19/historical');
});

router.get('/v2/historical/usacounties', async (req, res) => {
	res.redirect('/v3/covid-19/historical/usacounties');
});

router.get('/v2/historical/usacounties/:state', async (req, res) => {
	const { state } = req.params;
	const { lastdays } = req.query;
	
	res.redirect(`/v3/covid-19/historical/usacounties/${lastdays || ''}`);
});

router.get('/v2/historical/all', async (req, res) => {
	const { lastdays } = req.query;
	res.redirect(`/v3/covid-19/historical/all?${lastdays || ''}`);
});

router.get('/v2/historical/:query/:province?', async (req, res) => {
	const { query, province } = req.params;
	const { lastdays } = req.query;

	res.redirect(`/v3/covid-19/historical/${query || ''}/${province || ''}?${lastdays || ''}`)
});

module.exports = router;
