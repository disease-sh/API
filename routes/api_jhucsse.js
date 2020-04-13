// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys, scraper } = require('./instances');
const { splitQuery } = require('../utils/string_utils');

router.get('/v2/jhucsse', async (req, res) =>
	res.send(scraper.jhuLocations.generalizedJhudataV2(JSON.parse(await redis.get(keys.jhu_v2))))
);

router.get('/v2/jhucsse/counties/:county?', async (req, res) => {
	const { county } = req.params;
	const queriedCounties = splitQuery(county || '');
	let countyData;
	if (queriedCounties.length > 1) {
		countyData = {};
		for (const queriedcounty of queriedCounties) {
			countyData[queriedcounty] = scraper.jhuLocations.getCountyJhuDataV2(
				JSON.parse(await redis.get(keys.jhu_v2)),
				queriedcounty && queriedcounty.toLowerCase()
			);
			if (countyData[queriedcounty].length === 0) {
				delete countyData[queriedcounty];
			}
		}
	} else {
		countyData = scraper.jhuLocations.getCountyJhuDataV2(
			JSON.parse(await redis.get(keys.jhu_v2)),
			county && county.toLowerCase()
		);
	}
	if (countyData.length > 0 || Object.keys(countyData).length > 0) {
		res.send(countyData);
	} else {
		res.status(404).send({ message: 'County not found' });
	}
});

module.exports = router;
