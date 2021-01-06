// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('../../instances');

// This ensures date format conforms with date returned from other endpoints
const formatVaccineDate = (date) => {
	const { 0: year, 1: month, 2: day } = date.split('-');
	return `${month}/${day}/${year.slice(-2)}`;
};

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
		const extractedData = {};
		Object.keys(world).forEach((date) => {
			extractedData[formatVaccineDate(date)] = world[date].total;
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
		const extractedData = countries.map((country) => {
			const { timeline } = country;
			let total = 0;
			const obj = { country: country.country, timeline: {} };
			Object.keys(timeline).forEach((date) => {
				total += timeline[date].daily;
				obj.timeline[formatVaccineDate(date)] = total;
			});
			return obj;
		});
		res.send(extractedData);
	} else {
		res.status(404).send({ message: `Error fetching vaccine coverage data` });
	}
});

router.get(
	'/v3/covid-19/vaccine/coverage/countries/:country',
	async (req, res) => {
		const { country } = req.params;
		const data = JSON.parse(await redis.get(keys.vaccine_coverage));
		if (data) {
			const { countries } = data;
			const countryVaccineData = countries.find(
				(countryData) =>
					countryData.country.toLowerCase() === country.toLowerCase()
			);
			if (countryVaccineData) {
				const { timeline } = countryVaccineData;
				const obj = { country: countryVaccineData.country, timeline: {} };
				let total = 0;
				Object.keys(timeline).forEach((date) => {
					total += timeline[date].daily;
					obj.timeline[formatVaccineDate(date)] = total;
				});
				res.send(obj);
			} else {
				res
					.status(404)
					.send({
						message: `No vaccine data for requested country or country doesn not exist`
					});
			}
		} else {
			res.status(404).send({ message: `Error fetching vaccine coverage data` });
		}
	}
);

module.exports = router;
