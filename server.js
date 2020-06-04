const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const Sentry = require('@sentry/node');
const axios = require('axios');
const csrfProtection = require('csurf')({ cookie: true });
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const path = require('path');
const { config, port, redis, scraper, keys } = require('./routes/instances');
const { updateNYTCache } = require('./utils/nytCache');
const { updateAppleCache } = require('./utils/appleCache');

if (config.sentry_key) Sentry.init({ dsn: config.sentry_key });

updateNYTCache();
updateAppleCache();

app.use(require('cors')({ origin: '*' }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, {
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
}));

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');
app.use(require('cookie-parser')());

app.get('/', csrfProtection, async (req, res) => res.render('index', {
	csrfToken: req.csrfToken(),
	chartData: await scraper.historical.getHistoricalAllDataV2(JSON.parse(await redis.get(keys.historical_v2)), 'all')
}));

app.get('/invite', async (req, res) =>
	res.redirect('https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880'));

app.get('/support', async (req, res) => res.redirect('https://discord.gg/EvbMshU'));

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

app.use((req, res, next) => {
	if (process.env.TEST_MODE) {
		logger.info(`Status: ${res.statusCode}\t\t URL: ${res.req.path}`);
	}
	next();
});
// v2 routes
app.use(require('./routes/v2/apiWorldometers'));
app.use(require('./routes/v2/apiHistorical'));
app.use(require('./routes/v2/apiJHUCSSE'));
app.use(require('./routes/v2/apiDeprecated'));
app.use(require('./routes/v2/apiNYT'));
app.use(require('./routes/v2/apiApple'));
app.use(require('./routes/v2/apiGov'));
// v3 routes
app.use(require('./routes/v3/covid-19/apiWorldometers'));
app.use(require('./routes/v3/covid-19/apiHistorical'));
app.use(require('./routes/v3/covid-19/apiJHUCSSE'));
app.use(require('./routes/v3/covid-19/apiDeprecated'));
app.use(require('./routes/v3/covid-19/apiNYT'));
app.use(require('./routes/v3/covid-19/apiApple'));
app.use(require('./routes/v3/covid-19/apiGov'));
app.use(require('./routes/v3/ebola/apiEbola'));

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));

module.exports = app;
