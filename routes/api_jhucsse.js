// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, config, scraper } = require('./instances');
const { keys } = config;

router.get('/v2/jhucsse', async (req, res) =>
	res.send(scraper.jhuLocations.generalizedJhudataV2(JSON.parse(await redis.get(keys.jhu_v2))))
);

router.get('/v2/jhucsse/counties/:county?', async (req, res) => {
	const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');
	const { county } = req.params;
	const queriedCounties = splitQuery(county || '');
	let countyData;
	if (queriedCounties.length > 1) {
		countyData = {};
		for(let county of queriedCounties) {
			countyData[county] = scraper.jhuLocations.getCountyJhuDataV2(JSON.parse(await redis.get(keys.jhu_v2)), county && county.toLowerCase());
			if (countyData[county].length === 0) {
				delete countyData[county];
			}
		}
	} else {
		countyData = scraper.jhuLocations.getCountyJhuDataV2(JSON.parse(await redis.get(keys.jhu_v2)), county && county.toLowerCase());
	}
	console.log(countyData.length > 0 || Object.keys(countyData).length > 0)
	if (countyData.length > 0 || Object.keys(countyData).length > 0) {
		res.send(countyData);
	} else { res.status(404).send({ message: 'County not found' }); }
});

module.exports = router;
