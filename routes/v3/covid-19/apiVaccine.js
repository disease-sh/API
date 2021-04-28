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
		const { lastDays, isFullData } = parseVaccineQueryParams(req.query);
		const coverageData = buildVaccineTimeline(world, lastDays, isFullData);
		res.send(coverageData);
	} else {
		res.status(404).send({ message: `Error fetching vaccine coverage data` });
	}
});

router.get('/v3/covid-19/vaccine/coverage/countries', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine_coverage));
	if (data) {
		const { countries } = data;
		const { lastDays, isFullData } = parseVaccineQueryParams(req.query);
		const extractedData = countries.map((country) => {
			const { timeline } = country;
			const obj = {
				country: country.country,
				timeline: buildVaccineTimeline(timeline, lastDays, isFullData)
			};
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
			const { lastDays, isFullData } = parseVaccineQueryParams(req.query);
			const obj = {
				country: countryVaccineData.country,
				timeline: buildVaccineTimeline(timeline, lastDays, isFullData)
			};
			res.send(obj);
		} else {
			res.status(404).send({ message: 'No vaccine data for requested country or country does not exist' });
		}
	} else {
		res.status(404).send({ message: 'Error fetching vaccine coverage data' });
	}
}
);

router.get('/v3/covid-19/vaccine/coverage/states', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine_state_coverage));
	if (data) {
		const { states } = data;
		const { lastDays, isFullData } = parseVaccineQueryParams(req.query);
		const extractedData = states.map((state) => {
			const { timeline } = state;
			const obj = {
				state: state.state,
				timeline: buildVaccineTimeline(timeline, lastDays, isFullData)
			};
			return obj;
		});
		res.send(extractedData);
	} else {
		res.status(404).send({ message: `Error fetching vaccine state coverage data` });
	}
});

router.get('/v3/covid-19/vaccine/coverage/states/:query', async (req, res) => {
	const { query } = req.params;
	const data = JSON.parse(await redis.get(keys.vaccine_state_coverage));
	if (data) {
		const { states } = data;
		const stateVaccineData = states.find((stateData) => stateData.state.toLowerCase() === query.toLowerCase());
		if (stateVaccineData) {
			const { timeline } = stateVaccineData;
			const { lastDays, isFullData } = parseVaccineQueryParams(req.query);
			const obj = {
				state: stateVaccineData.state,
				timeline: buildVaccineTimeline(timeline, lastDays, isFullData)
			};
			res.send(obj);
		} else {
			res.status(404).send({ message: 'No vaccine data for requested state or state does not exist' });
		}
	} else {
		res.status(404).send({ message: 'Error fetching vaccine state coverage data' });
	}
});

/**
 * Reads the endpoint query parameters as strings and parses them into native js types.
 * @param {*} requestQuery The express req.query object.
 * @returns {*} Object contained the parsed query parameters.
 */
function parseVaccineQueryParams(requestQuery) {
	const { lastdays, fullData } = requestQuery;
	const numericLastDays = getLastDays(lastdays);
	const parsedFullData = fullData === 'true';
	return {
		lastDays: numericLastDays,
		isFullData: parsedFullData
	};
}

/**
 * Builds and formats a vaccine timeline.
 * @param {*} fullTimeline The full vaccine timeline data returned from redis.
 * @param {number} numDays The number of previous days to include.
 * @param {boolean} isFullData Whether or not to include the full vaccine data as a list, instead of an object keyed by date of only totals.
 * @returns {*} Formatted vaccine timeline.
 */
function buildVaccineTimeline(fullTimeline, numDays, isFullData) {
	const neededDates = Object.keys(fullTimeline).slice(numDays * -1);
	return isFullData ? buildFullVaccineTimeline(neededDates, fullTimeline) : buildSimpleVaccineTimeline(neededDates, fullTimeline);
}

/**
 * Builds a vaccine timeline of only totals for each date.
 * @param {*} dates The list of dates we want to return data for.
 * @param {*} timeline The original vaccine timeline returned from redis.
 * @returns {*} Object keyed by date, where each value is the total for that date.
 */
function buildSimpleVaccineTimeline(dates, timeline) {
	const simpleTimeline = {};
	dates.forEach(date => {
		simpleTimeline[date] = timeline[date].total;
	});
	return simpleTimeline;
}

/**
 * Builds the vaccine timeline as a list of full data. The schema is:
 * [
 * 	 {
 *     "total": number,
 *     "daily": number,
 *     "totalPerHundred": number,
 *     "dailyPerMillion": number,
 *     "date": string
 *   }
 * ]
 * @param {*} dates The list of dates we want to return data for.
 * @param {*} timeline The original vaccine timeline returned from redis.
 * @returns {*} List of objects conforming to the above structure.
 */
function buildFullVaccineTimeline(dates, timeline) {
	return dates.map(date => {
		const dateData = timeline[date];
		dateData.date = date;
		return dateData;
	});
}

module.exports = router;
