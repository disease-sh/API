// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/v2/gov/:country?', async (req, res) => {
	const { allowNull } = req.query;
	const { country: countryName } = req.params;
	res.redirect(`/v3/covid19/gov/${countryName || ''}?allowNull=${allowNull}`);
});

module.exports = router;
