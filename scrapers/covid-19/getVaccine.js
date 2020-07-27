const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../../utils/logger');

const cleanData = (data) => {
	const htmlRegex = /<(?:.|\n)*?>/gm;
	const separatorRefex = /;&nbsp;|;/;
	const listify = (attribute) => attribute.split(separatorRefex).map((sponsor) => sponsor.replace(htmlRegex, '').trim());
	return data.map((trial) => ({
		candidate: trial.Candidate,
		sponsors: listify(trial.Sponsor),
		details: trial['Study Design & Details'].replace(htmlRegex, ''),
		trialPhase: trial['Trial Phase'],
		institutions: listify(trial.Institution),
		funding: listify(trial.Funding)
	}));
};

/**
 * Fills redis with vaccine data
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const getVaccine = async (keys, redis) => {
	try {
		const { data } = await axios.get('https://www.raps.org/RAPS/media/news-images/data/20200723-vax-tracker-chart-craven.csv');
		const parsedData = await csv().fromString(data);
		redis.set(keys.vaccine, JSON.stringify(cleanData(parsedData)));
	} catch (err) {
		logger.err('Error: Requesting vaccine data failed!', err);
	}
};

module.exports = getVaccine;
