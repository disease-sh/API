const axios = require('axios'),
	{ config } = require('./routes/instances'),
	logger = require('./utils/logger');

const now = new Date();

const endpoints = {
	'covid-19': {
		all: (data) => data.updated && now - new Date(data.updated) > config.worldometersInterval * 1.5,
		countries: (data) => data[0].updated && now - new Date(data[0].updated) > config.worldometersInterval * 1.5,
		continents: (data) => data[0].updated && now - new Date(data[0].updated) > config.worldometersInterval * 1.5,
		states: (data) => data[0].updated && now - new Date(data[0].updated) > config.worldometersInterval * 1.5,
		jhucsse: (data) => data[0].updated && now - new Date(data[0].updatedAt) > 1000*60*60*24*2,
		'jhucsse/counties': (data) => data[0].updated && now - new Date(data[0].updatedAt) > 1000*60*60*24*2,
		'gov/italy': (data) => data[0].updated && now - new Date(data[0].updated) > config.govInterval * 1.5,
		'gov/south%20africa': (data) => data.updated && now - new Date(data.updated) > config.govInterval * 1.5,
		'gov/switzerland': (data) => data[0].updated && now - new Date(data[0].updated) > config.govInterval * 1.5,
		'gov/germany': (data) => data[0].updated && now - new Date(data[0].updated) > config.govInterval * 1.5,
		'gov/nigeria': (data) => data[0].updated && now - new Date(data[0].updated) > config.govInterval * 1.5,
		'gov/canada': (data) => data[0].updated && now - new Date(data[0].updated) > config.govInterval * 1.5,
		'gov/india': (data) => data.updated && now - new Date(data.updated) > config.govInterval * 1.5,
		'gov/israel': (data) => data.updated && now - new Date(data.updated) > config.govInterval * 1.5,
		'gov/new%20zealand': (data) => data.updated && now - new Date(data.updated) > config.govInterval * 1.5,
		'gov/austria': (data) => data.updated && now - new Date(data.updated) > config.govInterval * 1.5,
		'gov/vietnam': (data) => data[0].updated && now - new Date(data[0].updated) > config.govInterval * 1.5,
		'gov/mexico': (data) => data.updated && now - new Date(data.updated) > config.govInterval * 1.5,
		'gov/colombia': (data) => data.updated && now - new Date(data.updated) > config.govInterval * 1.5
	},
	influenza: []
};

const sendWebhook = async (data) => {
	try{
		await axios.post(process.env.UPDATE_WEBHOOK, data);
	}catch(err){
		console.log(err)
	}finally{
		return;
	}
};

const updateCheck = async () => {
	for (const disease of Object.keys(endpoints)) {
		for (const [endpoint, checker] of Object.entries(endpoints[disease])) {
			logger.info(`checking ${endpoint}`)
			try {
				const res = await axios.get(`https://disease.sh/v3/${disease}/${endpoint}`);
				// eslint-disable-next-line no-unused-expressions
				if(checker(res.data)) {
					logger.info('OUT OF DATE - sending Webhook message')
					await sendWebhook({
						embeds: [
							{
								title: `${disease}/${endpoint} - Out of Date`,
								url: `https://disease.sh/v3/${disease}/${endpoint}`
							}
						]
					});
				}
			} catch (err) {
				logger.info('ERROR - sending Webhook message')
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

module.exports = updateCheck;