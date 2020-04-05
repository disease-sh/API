// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, config, scraper } = require('./instances');
const { keys } = config;

router.get('/v2/jhucsse', async (req, res) =>
	res.send(scraper.jhuLocations.generalizedJhudataV2(JSON.parse(await redis.get(keys.jhu_v2))))
);

router.get('/v2/jhucsse/counties/:county?', async (req, res) => {
	const { county } = req.params;
	const countyData = scraper.jhuLocations.getCountyJhuDataV2(JSON.parse(await redis.get(keys.jhu_v2)), county && county.toLowerCase());
	if (countyData.length > 0) {
		res.send(countyData);
	} else { res.status(404).send({ message: 'County not found' }); }
});

module.exports = router;
