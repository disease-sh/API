const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const csv = require('csvtojson');
const logger = require('../../utils/logger');
const { phaseData } = require('../../utils/RAPS');

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
	const dateObj = new Date();
	const month = dateObj.getUTCMonth() + 1;
	const day = dateObj.getUTCDate();
	const year = dateObj.getUTCFullYear();

	let dataExists = false;
	let counter = 0;
	do {
		try {
			const cookieJar = new tough.CookieJar();
			const { data } = await axios.get(`https://www.raps.org/RAPS/media/news-images/data/${year}${month}${(day - counter).toString().padStart(2, '0')}-vax-tracker-Craven.csv`, {
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
	} while (dataExists === false && counter < 30);
};

module.exports = getVaccineData;
