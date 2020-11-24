const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const csv = require('csvtojson');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');
const { months, phaseData } = require('../../utils/RAPS');

axiosCookieJarSupport(axios);

const cleanData = (data) => {
	const htmlRegex = /<(?:.|\n)*?>/gm;
	const separatorRegex = /;&nbsp;|;/;
	const listify = (attribute) => attribute.split(separatorRegex).map((sponsor) => sponsor.replace(htmlRegex, '').trim());
	return data.map((trial) => ({
		candidate: trial.Candidate,
		mechanism: trial.Mechanism,
		sponsors: listify(trial.Sponsor),
		details: trial.Details.replace(htmlRegex, ''),
		trialPhase: trial['Trial Phase'],
		institutions: listify(trial.Institution)
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
		const cookieJar = new tough.CookieJar();
		const html = cheerio.load((await axios.get('https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker', {
			jar: cookieJar,
			withCredentials: true,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
				'Accept-Language': 'en-us',
				'Content-Language': 'en-us'
			}
		})).data);
		const date = html(`.small:first-of-type`).text().split(' ').slice(1, 4);
		[day, month, year] = date;
	} catch (err) {
		logger.err('Error: Requesting vaccine data failed!', err);
	}
	let dataExists = false;
	let counter = 0;
	do {
		try {
			const cookieJar = new tough.CookieJar();
			console.log(`https://www.raps.org/RAPS/media/news-images/data/${year}${months[month]}${(day - counter).toString().padStart(2, '0')}-vax-tracker-Craven.csv`);
			const { data } = await axios.get(`https://www.raps.org/RAPS/media/news-images/data/${year}${months[month]}${(day - counter).toString().padStart(2, '0')}-vax-tracker-Craven.csv`, {
				jar: cookieJar,
				withCredentials: true,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
					'Accept-Language': 'en-us',
					'Content-Language': 'en-us'
				}
			});
			const parsedData = await csv().fromString(data);
			redis.set(keys.vaccine, JSON.stringify({
				source: 'https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker',
				totalCandidates: parsedData.length.toString(),
				phases: phaseData(parsedData),
				data: cleanData(parsedData)
			}));
			dataExists = true;
		} catch (err) {
			logger.err('Error: Requesting vaccine CSV data failed!', err);
		}
		counter++;
	} while (dataExists === false && counter < 3);
};

module.exports = getVaccineData;
