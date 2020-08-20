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
	return data.map((medication) => ({
		medicationClass: medication['Medication class'],
		tradeName: listify(medication['Trade name (generic name)']),
		details: medication['Study Design & Details'].replace(htmlRegex, ''),
		developerResearcher: listify(medication['Developer/Researcher'].replace(htmlRegex, '')),
		sponsors: listify(medication.Sponsor),
		trialPhase: medication['Trial Phase'],
		lastUpdate: medication['Last update']
	}));
};

const phaseData = (data) => {
	const result = {};
	for (var i = 0; i < data.length; i++) {
		if (!result[data[i]['Trial Phase']]) {
			result[data[i]['Trial Phase']] = 0;
		}
		++result[data[i]['Trial Phase']];
	}
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
const getTherapeuticsData = async (keys, redis) => {
	let day, month, year;
	try {
		const html = cheerio.load((await axios.get('https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-therapeutics-tracker')).data);
		const date = html(`.small:first-of-type`).text().split(' ').slice(1, 4);
		[day, month, year] = date;
	} catch (err) {
		logger.err('Error: Requesting therapeutics data failed!', err);
	}
	try {
		const { data } = await axios.get(`https://www.raps.org/RAPS/media/news-images/data/${year}${months[month]}${day}-tx-tracker-Craven.csv`);
		const parsedData = await csv().fromString(data);
		redis.set(keys.therapeutics, JSON.stringify({
			source: 'https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-therapeutics-tracker',
			totalCandidates: parsedData.length.toString(),
			phases: phaseData(parsedData),
			data: cleanData(parsedData)
		}));
	} catch (err) {
		logger.err('Error: Requesting therapeutics data failed!', err);
	}
};

module.exports = getTherapeuticsData;
