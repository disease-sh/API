const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
const config = require('./config.json');
const scraper = require('./scraper');
const countryMap = require('./funcs/countryMap');
const countryUtils = require('./utils/country_utils');

const app = express();

app.use(cors());

// create redis instance :O
const redis = new Redis(config.redis.host, {
	password: config.redis.password,
	port: config.redis.port
});

const { keys } = config;

const execAll = () => {
	scraper.getWorldometers.getCountries(keys, redis);
	scraper.getAll(keys, redis);
	scraper.getStates(keys, redis);
	scraper.jhuLocations.jhudata(keys, redis);
	scraper.jhuLocations.jhudataV2(keys, redis);
	scraper.historical.historicalV2(keys, redis);
};
execAll();
setInterval(execAll, config.interval);

app.get('/', async (request, response) => {
	response.redirect('https://github.com/novelcovid/api');
});

const listener = app.listen(config.port, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});

app.get('/invite', async (req, res) => {
	/* eslint max-len: off */
	res.redirect('https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880');
});

app.get('/support', async (req, res) => {
	res.redirect('https://discord.gg/EvbMshU');
});

// API endpoints
app.get('/all', async (req, res) => {
	const all = JSON.parse(await redis.get(keys.all));
	res.send(all);
});

app.get('/states', async (req, res) => {
	const states = JSON.parse(await redis.get(keys.states));
	res.send(states);
});

app.get('/jhucsse', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.jhu));
	res.send(data);
});

app.get('/countries', async (req, res) => {
	const { sort } = req.query;
	let countries = JSON.parse(await redis.get(keys.countries));
	if (sort) {
		countries = countries.sort((a, b) => a[sort] > b[sort] ? -1 : 1);
	}
	res.send(countries);
});

app.get('/countries/:query', async (req, res) => {
	const countries = JSON.parse(await redis.get(keys.countries));
	const { query } = req.params;
	/* eslint-disable-next-line no-restricted-globals */
	const isText = isNaN(query);

	const country = countries.find((ctry) => {
		if (isText) {
			// either name or ISO
			const standardizedCountryName = countryMap.standardizeCountryName(query.toLowerCase());
			// check for strict param
			if (req.query.strict) {
				return req.query.strict.toLowerCase() === 'true'
					? ctry.country.toLowerCase() === standardizedCountryName
					: ctry.country.toLowerCase().includes(standardizedCountryName);
			}
			return (
				(ctry.countryInfo.iso3 || 'null').toLowerCase() === query.toLowerCase()
				|| (ctry.countryInfo.iso2 || 'null').toLowerCase() === query.toLowerCase()
				|| ((query.length > 3 || countryUtils.isCountryException(query.toLowerCase()))
					&& ctry.country.toLowerCase().includes(standardizedCountryName))
			);
		}
		// number, must be country ID
		return ctry.countryInfo._id === Number(query);
	});

	if (country) {
		res.send(country);
		return;
	}
	// adding status code 404 not found and sending response
	res.status(404).send({ message: 'Country not found or doesn\'t have any cases' });
});

app.get('/v2/historical', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.historical_v2));
	data.forEach(item => {
		delete item.countryInfo;
	});
	res.send(data);
});

app.get('/v2/historical/all', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.historical_v2));
	const allData = await scraper.historical.getHistoricalAllDataV2(data);
	res.send(allData);
});

app.get('/v2/historical/:query/:province?', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.historical_v2));
	const { query, province } = req.params;
	const countries = query.split(',');
	const provinces = province && province.split(',');
	let countryData;
	if (countries.length > 0) {
		countryData = countries.map((country, i) =>
			scraper.historical.getHistoricalCountryDataV2(
				data,
				country.toLowerCase(),
				provinces && provinces[i] && provinces[i].toLowerCase()
			)
		);
	} else {
		countryData = scraper.historical.getHistoricalCountryDataV2(
			data,
			query.toLowerCase(),
			province && province.toLowerCase()
		);
	}
	if (countryData) {
		res.send(countryData);
	} else {
		res.status(404).send({ message: 'Country not found or doesn\'t have any historical data' });
	}
});

app.get('/v2/jhucsse', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.jhu_v2));
	res.send(data);
});

// deprecated
app.get('/historical', async (req, res) => {
	res.send({ message: 'Deprecated, use /v2/historical' });
});

app.get('/historical/:country', async (req, res) => {
	res.send({ message: 'Deprecated, use /v2/historical' });
});
