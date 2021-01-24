// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('../../instances');
const { getLastDays } = require('../../../utils/stringUtils');

router.get('/v3/covid-19/vaccine', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine));
	if (data) {
		res.send(data);
	} else {
		res.status(404).send({ message: `Error fetching vaccine data` });
	}
});

router.get('/v3/covid-19/vaccine/coverage', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine_coverage));
	if (data) {
		const { world } = data;
		const { lastdays } = req.query;
		const numericLastDays = getLastDays(lastdays);
		const extractedData = {};
		Object.keys(world).slice(numericLastDays * -1).forEach((date) => {
			extractedData[date] = world[date].total;
		});
		res.send(extractedData);
	} else {
		res.status(404).send({ message: `Error fetching vaccine coverage data` });
	}
});

router.get('/v3/covid-19/vaccine/coverage/countries', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine_coverage));
	if (data) {
		const { countries } = data;
		const { lastdays } = req.query;
		const numericLastDays = getLastDays(lastdays);
		const extractedData = countries.map((country) => {
			const { timeline } = country;
			const obj = { country: country.country, timeline: {} };
			Object.keys(timeline).slice(numericLastDays * -1).forEach((date) => {
				obj.timeline[date] = timeline[date].total;
			});
			return obj;
		});
		res.send(extractedData);
	} else {
		res.status(404).send({ message: `Error fetching vaccine coverage data` });
	}
});

router.get('/v3/covid-19/vaccine/coverage/countries/:country', async (req, res) => {
	const { country } = req.params;
	const data = JSON.parse(await redis.get(keys.vaccine_coverage));
	if (data) {
		const { countries } = data;
		const countryVaccineData = countries.find((countryData) =>
			countryData.countryInfo.country.toLowerCase() === country.toLowerCase()
			|| countryData.countryInfo.iso2.toLowerCase() === country.toLowerCase()
			|| countryData.countryInfo.iso3.toLowerCase() === country.toLowerCase());
		if (countryVaccineData) {
			const { timeline } = countryVaccineData;
			const { lastdays } = req.query;
			const numericLastDays = getLastDays(lastdays);
			const obj = { country: countryVaccineData.country, data: [] };

			Object.keys(timeline).slice(numericLastDays * -1).forEach((date) => {
				const entry = {
					date, ...timeline[date]
				};
				obj.data.push(entry);
			});
			res.send(obj);
		} else {
			res.status(404).send({ message: 'No vaccine data for requested country or country does not exist' });
		}
	} else {
		res.status(404).send({ message: 'Error fetching vaccine coverage data' });
	}
}
);

module.exports = router;
