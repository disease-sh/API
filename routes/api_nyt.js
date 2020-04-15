// eslint-disable-next-line new-cap
const router = require('express').Router();
const { nytCounties, nytStates, nytNationwide } = require('../utils/nyt_cache');

router.get('/nyt/states', async (req, res) => {
	const data = nytStates();
	const { state: queryState } = req.query;
	if (queryState) {
		const stateData = data.filter(({ state }) => queryState === state);
		// eslint-disable-next-line no-unused-expressions
		stateData.length > 0
			? res.send(stateData)
			: res.status(404).send({ message: 'State not found or no data found for state' });
	} else {
		res.send(data);
	}
});

router.get('/nyt/counties', async (req, res) => {
	const data = nytCounties();
	const { county: queryCounty } = req.query;
	if (queryCounty) {
		const countyData = data.filter(({ county }) => queryCounty === county);
		// eslint-disable-next-line no-unused-expressions
		countyData.length > 0
			? res.send(countyData)
			: res.status(404).send({ message: 'County not found or no data found for county' });
	} else {
		res.send(data);
	}
});

router.get('nyt/nation_wide', async (req, res) => {
	res.send(nytNationwide());
});

module.exports = router;
