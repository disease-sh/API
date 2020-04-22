const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const Sentry = require('@sentry/node');
const axios = require('axios');
const csrfProtection = require('csurf')({ cookie: true });
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const path = require('path');
const { redis, config, keys, scraper } = require('./routes/instances');
Sentry.init({ dsn: 'https://6f4916605ad146fe800ee7d6c82888d4@sentry.farfrom.earth/9' });

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

const execNyt = () => scraper.nytData(keys, redis);

execAll();
execNyt();

// Update Worldometer and Johns Hopkins data every 10 minutes
setInterval(execAll, config.interval);
// Update NYT data every hour
setInterval(execNyt, config.nyt_interval);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/docs',
	swaggerUi.serve,
	swaggerUi.setup(null, {
		explorer: true,
		customSiteTitle: 'NovelCOVID 19 API',
		customfavIcon: '/assets/img/virus.png',
		customCssUrl: '/assets/css/apidocs.css',
		swaggerOptions: {
			urls: [
				{
					name: 'version 2.0.0',
					url: '/apidocs/swagger_v2.json'
				},
				{
					name: 'version 1.0.0',
					url: '/apidocs/swagger_v1.json'
				}
			]
		}
	})
);

app.use(require('cors')());

app.get('/invite', async (req, res) =>
	res.redirect('https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880')
);

app.get('/support', async (req, res) => res.redirect('https://discord.gg/EvbMshU'));

app.use(require('./routes/api_worldometers'));
app.use(require('./routes/api_historical'));
app.use(require('./routes/api_jhucsse'));
app.use(require('./routes/api_deprecated'));
app.use(require('./routes/api_nyt'));

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');
app.use(require('cookie-parser')());

app.get('/', csrfProtection, async (req, res) => res.render('index', { csrfToken: req.csrfToken() }));

app.post('/private/mailgun', bodyParser.json(), bodyParser.urlencoded({ extended: false }), csrfProtection, async (req, res) => {
	// mailgun data
	const { email } = req.query;
	const DOMAIN = 'lmao.ninja';
	const mailgun = require('mailgun-js')({ apiKey: config.mailgunApiKey, domain: DOMAIN });
	const list = mailgun.lists(`updates@${DOMAIN}`);
	const newMember = {
		subscribed: true,
		address: email
	};
	// recaptcha data
	const recaptchaURL = `https://www.google.com/recaptcha/api/siteverify?secret=${config.captchaSecret}&response=${req.body.recaptcha}`;
	const recaptchaResponse = await axios.get(recaptchaURL);
	if (recaptchaResponse.data.success) {
		list.members().create(newMember, (error, data) => res.send(error ? { err: error } : data));
	} else {
		res.send({ err: 'recaptcha error' });
	}
});

app.listen(config.port, () =>
	logger.info(`Your app is listening on port ${config.port}`)
);

module.exports = app;
