// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/v2/jhucsse', async (req, res) => {
	res.redirect('/v3/covid-19/jhucsse');
});

router.get('/v2/jhucsse/counties/:county?', async (req, res) => {
	const { county } = req.params;

	res.redirect(`/v3/covid-19/jhucsse/counties/${county || ''}`);
});

module.exports = router;
