const axios = require('axios'),
	{ config } = require('./routes/instances'),
	logger = require('./utils/logger');

const now = new Date();

const endpoints = {
	'covid-19': {
		all: (data) => now - new Date(data.updated) > config.worldometersInterval,
		countries: (data) => now - new Date(data[0].updated) > config.worldometersInterval,
		continents: (data) => now - new Date(data[0].updated) > config.worldometersInterval,
		states: (data) => now - new Date(data[0].updated) > config.worldometersInterval,
		jhucsse: (data) => now - new Date(data[0].updatedAt) > config.worldometersInterval,
		'jhucsse/counties': (data) => now - new Date(data[0].updatedAt) > config.worldometersInterval,
		'gov/italy': (data) => now - new Date(data[0].updated) > config.govInterval,
		'gov/south%20africa': (data) => now - new Date(data.updated) > config.govInterval,
		'gov/switzerland': (data) => now - new Date(data[0].updated) > config.govInterval,
		'gov/germany': (data) => now - new Date(data[0].updated) > config.govInterval,
		'gov/nigeria': (data) => now - new Date(data[0].updated) > config.govInterval,
		'gov/canada': (data) => now - new Date(data[0].updated) > config.govInterval,
		'gov/india': (data) => now - new Date(data.updated) > config.govInterval,
		'gov/israel': (data) => now - new Date(data.updated) > config.govInterval,
		'gov/new%20zealand': (data) => now - new Date(data.updated) > config.govInterval,
		'gov/austria': (data) => now - new Date(data.updated) > config.govInterval,
		'gov/vietnam': (data) => now - new Date(data[0].updated) > config.govInterval,
		'gov/mexico': (data) => now - new Date(data.updated) > config.govInterval,
		'gov/colombia': (data) => now - new Date(data.updated) > config.govInterval
	},
	influenza: []
};

const updateCheck = () => {
	Object.keys(endpoints).forEach(disease => {
		Object.entries(endpoints[disease]).forEach(async ([endpoint, checker]) => {
			try {
				const res = (await axios.get(`https://disease.sh/v3/${disease}/${endpoint}`)).data;
				// eslint-disable-next-line no-unused-expressions
				checker(res) && logger.info(`${disease}/${endpoint} - OUT OF DATE`);
			} catch (err) {
				logger.info(`${disease}/${endpoint} - ERR`);
			}
		});
	});
};

updateCheck();
