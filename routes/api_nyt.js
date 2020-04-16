// eslint-disable-next-line new-cap
const router = require('express').Router();
const { nytCounties, nytStates, nytNationwide } = require('../utils/nyt_cache');

router.get('/v2/nyt/states', async (req, res) => {
	const { state: queryState } = req.query;
	const data = nytStates();
	if (queryState) {
		const stateArr = queryState.split(/,[\s+]?/);
		const stateData = data.filter(({ state }) => stateArr.includes(state));
		// eslint-disable-next-line no-unused-expressions
		stateData.length > 0
			? res.send(stateData)
			: res.status(404).send({ message: 'State not found or no data found for state' });
	} else {
		res.send(data);
	}
});

router.get('/v2/nyt/counties', async (req, res) => {
	const { county: queryCounty } = req.query;
	const data = nytCounties();
	if (queryCounty) {
		const countyArr = queryCounty.split(/,[\s+?]/);
		const countyData = data.filter(({ county }) => countyArr.includes(county));
		// eslint-disable-next-line no-unused-expressions
		countyData.length > 0
			? res.send(countyData)
			: res.status(404).send({ message: 'County not found or no data found for county' });
	} else {
		res.send(data);
	}
});

router.get('/v2/nyt/usa', async (req, res) => res.send(nytNationwide()));

module.exports = router;
