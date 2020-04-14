const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const app = express();
const logger = require('./utils/logger');
const { redis, config, keys, scraper } = require('./routes/instances');

const execAll = async () => {
	await Promise.all([
		scraper.getWorldometerPage(keys, redis),
		scraper.getStates(keys, redis),
		scraper.jhuLocations.jhudataV2(keys, redis),
		scraper.historical.historicalV2(keys, redis),
		scraper.historical.getHistoricalUSADataV2(keys, redis)
	]);
	logger.info('Finished scraping!');
	app.emit('scrapper_finished');
};

execAll();
setInterval(execAll, config.interval);

app.use(cors());
app.get('/', async (req, res) => res.redirect('https://github.com/novelcovid/api'));

app.get('/invite', async (req, res) =>
	res.redirect('https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880')
);

app.get('/support', async (req, res) => res.redirect('https://discord.gg/EvbMshU'));

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

app.listen(config.port, () =>
	logger.info(`Your app is listening on port ${config.port}`)
);

module.exports = app;
