const express = require('express');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const app = express();
const csrfProtection = require('csurf')({ cookie: true });
const logger = require('./utils/logger');
const path = require('path');
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

app.get('/invite', async (req, res) =>
	res.redirect('https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880')
);

app.get('/support', async (req, res) => res.redirect('https://discord.gg/EvbMshU'));

app.use(require('./routes/api_worldometers'));
app.use(require('./routes/api_historical'));
app.use(require('./routes/api_jhucsse'));
app.use(require('./routes/api_deprecated'));

app.use(require('cors')());
app.use(express.static('public'));
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

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');
app.use(require('cookie-parser')());

app.get('/', csrfProtection, async (req, res) => res.render('index', { csrfToken: req.csrfToken() }));

app.post('/private/cloudflare', require('body-parser').urlencoded({ extended: true }), csrfProtection, async (req, res) => {
	const zoneTag = 'b2070162162124e2d5414cee23dfe861';
	let response;
	try {
		response = await axios.get('https://api.cloudflare.com/client/v4/graphql', {
			method: 'POST',
			headers: {
				'x-auth-key': config.cfApiKey,
				'x-auth-email': 'elitemythyt@gmail.com'
			},
			body: `"{"query":"{\n  viewer {\n    zones(filter: { zoneTag: ${zoneTag} }) {\n      
				httpRequests1dGroups(\n        orderBy: [date_ASC]\n        limit: 1000\n        
				filter: { date_gt: "2019-07-15" }\n      ) {\n        date: dimensions {\n          
				date\n        }\n        sum {\n          cachedBytes\n          bytes\n        }\n      }\n    }\n  }\n}","variables":{}}"`
		});
	} catch (err) {
		logger.err('Error: Requesting private/cloudflare failed', err);
		res.send(err);
		return;
	}
	if (response.status === 200) {
		res.send(await response.data);
	} else {
		// return some kinda of error if you like
		res.send(response.error);
	}
});

app.listen(config.port, () =>
	logger.info(`Your app is listening on port ${config.port}`)
);

module.exports = app;
