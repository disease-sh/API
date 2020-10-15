const axios = require('axios'),
	{ config } = require('./routes/instances'),
	logger = require('./utils/logger');

const now = new Date(),
	rangeExtension = 1.5,
	worldometersRange = 2,
	jhuRange = 1000 * 60 * 60 * 24 * rangeExtension;

const endpoints = {
	'covid-19': {
		// 20 minutes
		all: (data) => data.updated && now - new Date(data.updated) - (config.worldometersInterval * worldometersRange),
		countries: (data) => data[0].updated && now - new Date(data[0].updated) - (config.worldometersInterval * worldometersRange),
		continents: (data) => data[0].updated && now - new Date(data[0].updated) - (config.worldometersInterval * worldometersRange),
		states: (data) => data[0].updated && now - new Date(data[0].updated) - (config.worldometersInterval * worldometersRange),
		// 1.5 days
		jhucsse: (data) => data[0].updated && now - new Date(data[0].updatedAt) - jhuRange,
		// 1.5 days
		'jhucsse/counties': (data) => data[0].updated && now - new Date(data[0].updatedAt) - jhuRange,
		'gov/italy': (data) => data[0].updated && now - new Date(data[0].updated) - (config.govInterval * rangeExtension),
		'gov/south%20africa': (data) => data.updated && now - new Date(data.updated) - (config.govInterval * rangeExtension),
		'gov/switzerland': (data) => data[0].updated && now - new Date(data[0].updated) - (config.govInterval * rangeExtension),
		'gov/germany': (data) => data[0].updated && now - new Date(data[0].updated) - (config.govInterval * rangeExtension),
		'gov/nigeria': (data) => data[0].updated && now - new Date(data[0].updated) - (config.govInterval * rangeExtension),
		'gov/canada': (data) => data[0].updated && now - new Date(data[0].updated) - (config.govInterval * rangeExtension),
		'gov/india': (data) => data.updated && now - new Date(data.updated) - (config.govInterval * rangeExtension),
		'gov/indonesia': (data) => data.updated && now - new Date(data.updated) - (config.govInterval * rangeExtension),
		'gov/israel': (data) => data.updated && now - new Date(data.updated) - (config.govInterval * rangeExtension),
		'gov/new%20zealand': (data) => data.updated && now - new Date(data.updated) - (config.govInterval * rangeExtension),
		'gov/austria': (data) => data.updated && (now - new Date(data.updated)) - (config.govInterval * rangeExtension),
		'gov/south%20korea': (data) => data.updated && (now - new Date(data.updated)) - (config.govInterval * rangeExtension)
	},
	influenza: []
};

const sendWebhook = async (data) => {
	try {
		await axios.post(process.env.UPDATE_WEBHOOK, data);
	} catch (err) {
		console.log(err);
	}
};

const checkOutOfDate = async () => {
	for (const disease of Object.keys(endpoints)) {
		for (const [endpoint, checker] of Object.entries(endpoints[disease])) {
			logger.info(`checking ${endpoint}`);
			try {
				const res = await axios.get(`https://disease.sh/v3/${disease}/${endpoint}`);
				let delta;
				// eslint-disable-next-line no-unused-expressions
				if ((delta = checker(res.data)) > 0) {
					logger.info('OUT OF DATE - sending Webhook message');
					await sendWebhook({
						embeds: [
							{
								title: `${disease}/${endpoint} - Out of Date`,
								description: `${(delta / 1000 / 60 / 60).toFixed(1)} hours`,
								url: `https://disease.sh/v3/${disease}/${endpoint}`
							}
						]
					});
				}
			} catch (err) {
				logger.info('ERROR - sending Webhook message');
				await sendWebhook({
					embeds: [
						{
							title: `${disease}/${endpoint} - Error`,
							url: `https://disease.sh/v3/${disease}/${endpoint}`,
							description: err.message || 'No message'
						}
					]
				});
			}
		}
	}
	process.exit();
};

checkOutOfDate();
