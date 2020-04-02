const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());

// create redis and scraper instance :O
const { redis, config, scraper } = require('./routes/instances');
const { keys } = config;

const execAll = () => {
	scraper.getWorldometers.getCountries(keys, redis);
	scraper.getWorldometers.getYesterday(keys, redis);
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

app.get('/yesterday', async (req, res) => {
	const yesterday = JSON.parse(await redis.get(keys.yesterday));
	res.send(yesterday);
});

app.use(require('./routes/api_countries'));
app.use(require('./routes/api_historical'));
app.use(require('./routes/api_jhucsse'));
app.use(require('./routes/api_deprecated'));
