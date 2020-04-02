// eslint-disable-next-line new-cap
const router = require('express').Router();

const { redis, config, scraper } = require('./instances');
const { keys } = config;

router.get('/jhucsse', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.jhu));
	res.send(data);
});

router.get('/v2/jhucsse', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.jhu_v2));
	const generalizedData = scraper.jhuLocations.generalizedJhudataV2(data);
	res.send(generalizedData);
});

router.get('/v2/jhucsse/counties/:county?', async (req, res) => {
	const { county } = req.params;
	const data = JSON.parse(await redis.get(keys.jhu_v2));
	const countyData = scraper.jhuLocations.getCountyJhuDataV2(data, county && county.toLowerCase());
	if (countyData.length > 0) {
		res.send(countyData);
	} else {
		res.status(404).send({ message: 'County not found' });
	}
});

module.exports = router;
