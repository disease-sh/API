const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
const config = require('./config.json');
const scraper = require('./scraper');
const countryUtils = require('./utils/country_utils');
const stringUtils = require('./utils/string_utils');
const swaggerUi = require('swagger-ui-express');

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

app.use('/public', express.static('assets'));
app.use('/docs',
	swaggerUi.serve,
	swaggerUi.setup(null, {
		explorer: true,
		customSiteTitle: 'NovelCOVID 19 API',
		customfavIcon: '/public/virus.png',
		customCssUrl: '/public/apidocs/custom.css',
		swaggerOptions: {
			urls: [
				{
					name: 'version 2.0.0',
					url: '/public/apidocs/swagger_v2.json'
				},
				{
					name: 'version 1.0.0',
					url: '/public/apidocs/swagger_v1.json'
				}
			]
		}
	})
);

// API endpoints
app.get('/all', async (req, res) => {
	const all = JSON.parse(await redis.get(keys.all));
	const countries = JSON.parse(await redis.get(keys.countries));
	all.affectedCountries = countries.length;
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
	const countryInfo = isText ? countryUtils.getCountryData(query) : null;
	const standardizedCountryName = stringUtils.wordsStandardize(countryInfo && countryInfo.country ? countryInfo.country : query);

	const country = countries.find((ctry) => {
		// either name or ISO
		if (isText) {
			// check for strict param
			if (req.query.strict) {
				return req.query.strict.toLowerCase() === 'true'
					? stringUtils.wordsStandardize(ctry.country) === standardizedCountryName
					: stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName);
			}
			return (
				(ctry.countryInfo.iso3 || 'null').toLowerCase() === query.toLowerCase()
				|| (ctry.countryInfo.iso2 || 'null').toLowerCase() === query.toLowerCase()
				|| ((query.length > 3 || countryUtils.isCountryException(query.toLowerCase()))
					&& stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName))
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
	const provinces = (province && province.split(',')) || [];
	let countryData;
	// multiple countries no provinces allowed
	if (countries.length > 1) {
		countryData = countries.map((country) =>
			scraper.historical.getHistoricalCountryDataV2(
				data,
				country.toLowerCase(),
				null
			) || { err: 'Country not found or doesn\'t have any historical data' }
		);
	} else if (provinces.length > 0) {
		// provinces for one country
		countryData = provinces.map((prov) =>
			scraper.historical.getHistoricalCountryDataV2(
				data,
				countries[0].toLowerCase(),
				prov.toLowerCase().trim()
			) || { err: 'Country not found or doesn\'t have any historical data' }
		);
	} else {
		countryData = scraper.historical.getHistoricalCountryDataV2(
			data,
			query.toLowerCase(),
			province && province.toLowerCase()
		);
	}
	if (countryData) {
		res.send(countryData.length === 1 ? countryData[0] : countryData);
	} else {
		res.status(404).send({ message: 'Country not found or doesn\'t have any historical data' });
	}
});

app.get('/v2/jhucsse', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.jhu_v2));
	const generalizedData = scraper.jhuLocations.generalizedJhudataV2(data);
	res.send(generalizedData);
});

app.get('/v2/jhucsse/counties/:county?', async (req, res) => {
	const { county } = req.params;
	const data = JSON.parse(await redis.get(keys.jhu_v2));
	const countyData = scraper.jhuLocations.getCountyJhuDataV2(data, county && county.toLowerCase());
	if (countyData.length > 0) {
		res.send(countyData);
	} else {
		res.status(404).send({ message: 'County not found' });
	}
});

// deprecated
app.get('/historical', async (req, res) => {
	res.send({ message: 'Deprecated, use /v2/historical' });
});

app.get('/historical/:country', async (req, res) => {
	res.send({ message: 'Deprecated, use /v2/historical' });
});
