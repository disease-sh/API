const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors());

// create redis and scraper instance :O
const { redis, config, scraper } = require('./routes/instances');
const { keys } = config;

const execAll = async () => {
	await scraper.getWorldometers.getWorldometerPage(keys, redis);
	await scraper.getStates(keys, redis);
	await scraper.jhuLocations.jhudataV2(keys, redis);
	await scraper.historical.historicalV2(keys, redis);
	app.emit('scrapper_finished');
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

app.use(require('./routes/api_worldometers'));
app.use(require('./routes/api_historical'));
app.use(require('./routes/api_jhucsse'));
app.use(require('./routes/api_deprecated'));

module.exports = app;
