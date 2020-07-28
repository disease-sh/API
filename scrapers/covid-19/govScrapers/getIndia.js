const axios = require('axios');
const logger = require('../../../utils/logger');

/**
 * Scrapes India government site and fills array of data from table
 */
const indiaData = async () => {
	try {
		const states = (await axios('https://www.mohfw.gov.in/data/datanew.json')).data
			.map(entry => ({
				state: entry.state_name,
				active: parseInt(entry.new_active),
				recovered: parseInt(entry.new_cured),
				deaths: parseInt(entry.new_death),
				cases: parseInt(entry.new_positive),
				todayActive: parseInt(entry.new_active) - parseInt(entry.active),
				todayRecovered: parseInt(entry.new_cured) - parseInt(entry.cured),
				todayDeaths: parseInt(entry.new_death) - parseInt(entry.death),
				todayCases: parseInt(entry.new_positive) - parseInt(entry.positive)
			}));
		const total = states.splice(-1, 1)[0];
		delete total.state;
		return {
			updated: Date.now(),
			total,
			states
		};
	} catch (err) {
		logger.err('Error: Requesting India Gov Data failed!', err);
		return null;
	}
};

module.exports = indiaData;
