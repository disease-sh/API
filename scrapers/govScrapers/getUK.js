const axios = require('axios');
const logger = require('../../utils/logger');

/**
 * Scrapes UK government json 
 */
const ukData = async () => {
	try {
		const casesJson = (await axios.get('https://c19downloads.azureedge.net/downloads/json/coronavirus-cases_latest.json')).data;
    const deathsJson = (await axios.get('https://c19downloads.azureedge.net/downloads/json/coronavirus-deaths_latest.json')).data;
    const metadata = casesJson.metadata;
    delete casesJson.ltlas;
    delete casesJson.utlas;
    delete casesJson.metadata;
    delete deathsJson.metadata;
		return {
      disclaimer: metadata.disclaimer,
      updated: Date.parse(metadata.lastUpdatedAt),
      cases: casesJson,
      deaths: deathsJson
    };
	} catch (err) {
		logger.err('Error: Requesting UK Gov Data failed!', err);
		return null;
	}
};

module.exports = ukData;