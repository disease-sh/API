// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/country_utils');

const { appleData } = require('../utils/apple_cache');

router.get('/v2/apple/countries', async (req, res) => {
	const data = [...new Set(appleData().map((element) => element.country))];
	res.send(data.map((element) => countryUtils.getCountryData(element).country || element));
});


// router.get('/v2/nyt/counties/:county', async (req, res) => {
// 	const { county: queryCounty } = req.params;
// 	const data = nytCounties();
// 	if (queryCounty) {
// 		const countyArr = queryCounty.trim().split(/,[\s+?]/).map((county) => county.toLowerCase());
// 		const countyData = data.filter(({ county }) => countyArr.includes(county.toLowerCase()));
// 		// eslint-disable-next-line no-unused-expressions
// 		countyData.length > 0
// 			? res.send(countyData)
// 			: res.status(404).send({ message: 'County not found or no data found for county' });
// 	} else {
// 		res.send(data);
// 	}
// });

// router.get('/v2/nyt/usa', async (req, res) => res.send(nytNationwide()));

module.exports = router;
