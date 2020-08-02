const axios = require('axios');
const csv = require('csvtojson');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');

const months = {
	January: '01',
	February: '02',
	March: '03',
	Arpril: '04',
	May: '05',
	June: '06',
	July: '07',
	August: '08',
	September: '09',
	October: '10',
	November: '11',
	December: '12'
};

const cleanData = (data) => {
	const htmlRegex = /<(?:.|\n)*?>/gm;
	const separatorRegex = /;&nbsp;|;/;
	const listify = (attribute) => attribute.split(separatorRegex).map((sponsor) => sponsor.replace(htmlRegex, '').trim());
	return data.map((trial) => ({
		candidate: trial.Candidate,
		sponsors: listify(trial.Sponsor),
		details: trial['Study Design & Details'].replace(htmlRegex, ''),
		trialPhase: trial['Trial Phase'],
		institutions: listify(trial.Institution),
		funding: listify(trial.Funding)
	}));
};

const phaseData = (data) => {
	const result = {};
	data.map((trial) => {
		if(!result[trial['Trial Phase']])
			result[trial['Trial Phase']]=0
		++result[trial['Trial Phase']];
	});
	return Object.keys(result).map((key) => ({
		phase: key,
		candidates: result[key].toString()
	}));
};

/**
 * Fills redis with vaccine data
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const getVaccineData = async (keys, redis) => {
	let day, month, year;
	try {
		const html = cheerio.load((await axios.get('https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker')).data);
		const date = html(`.small:first-of-type`).text().split(' ').slice(1, 4);
		[day, month, year] = date;
	} catch (err) {
		logger.err('Error: Requesting vaccine data failed!', err);
	}
	try {
		const { data } = await axios.get(`https://www.raps.org/RAPS/media/news-images/data/${year}${months[month]}${day}-vax-tracker-chart-craven.csv`);
		const parsedData = await csv().fromString(data);
		redis.set(keys.vaccine, JSON.stringify({
			source: 'https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker',
			totalCandidates: parsedData.length.toString(),
			phases: phaseData(parsedData),
			data: cleanData(parsedData)
		}));
	} catch (err) {
		logger.err('Error: Requesting vaccine data failed!', err);
	}
};

module.exports = getVaccineData;
