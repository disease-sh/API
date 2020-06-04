// eslint-disable-next-line new-cap
const router = require('express').Router();
const { nytCounties, nytStates, nytNationwide } = require('../../../utils/nytCache');

router.get('/v3/covid19/nyt/states', async (req, res) => res.send(nytStates()));

router.get('/v3/covid19/nyt/states/:state', async (req, res) => {
	const { state: queryState } = req.params;
	const data = nytStates();
	if (queryState) {
		const stateArr = queryState.trim().split(/,[\s+]?/).map((state) => state.toLowerCase());
		const stateData = data.filter(({ state }) => stateArr.includes(state.toLowerCase()));
		// eslint-disable-next-line no-unused-expressions
		stateData.length > 0
			? res.send(stateData)
			: res.status(404).send({ message: 'State not found or no data found for state' });
	} else {
		res.send(data);
	}
});

router.get('/v3/covid19/nyt/counties', async (req, res) => res.send(nytCounties()));

router.get('/v3/covid19/nyt/counties/:county', async (req, res) => {
	const { county: queryCounty } = req.params;
	const data = nytCounties();
	if (queryCounty) {
		const countyArr = queryCounty.trim().split(/,[\s+?]/).map((county) => county.toLowerCase());
		const countyData = data.filter(({ county }) => countyArr.includes(county.toLowerCase()));
		// eslint-disable-next-line no-unused-expressions
		countyData.length > 0
			? res.send(countyData)
			: res.status(404).send({ message: 'County not found or no data found for county' });
	} else {
		res.send(data);
	}
});

router.get('/v3/covid19/nyt/usa', async (req, res) => res.send(nytNationwide()));

module.exports = router;
