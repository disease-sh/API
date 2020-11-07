const axios = require('axios');
const csv = require('csvtojson');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');
const { months, phaseData } = require('../../utils/RAPS');

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
	let dataExists = false;
	let counter = 0;
	do {
		try {
			const { data } = await axios.get(`https://www.raps.org/RAPS/media/news-images/data/${year}${months[month]}${(day - counter).toString().padStart(2, '0')}-tx-tracker-Craven.csv`);
			const parsedData = await csv().fromString(data);
			redis.set(keys.therapeutics, JSON.stringify({
				source: 'https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-therapeutics-tracker',
				totalCandidates: parsedData.length.toString(),
				phases: phaseData(parsedData),
				data: cleanData(parsedData)
			}));
			dataExists = true;
		} catch (err) {
			logger.err('Error: Requesting therapeutics CSV data failed!', err);
		}
		counter++;
	} while (dataExists === false && counter < 3);
};

module.exports = getTherapeuticsData;
