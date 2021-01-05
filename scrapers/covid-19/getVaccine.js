const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const csv = require('csvtojson');
const logger = require('../../utils/logger');
const countries = require('../../utils/countries');
const { phaseData } = require('../../utils/RAPS');

axiosCookieJarSupport(axios);

const cleanData = (data) => {
	const htmlRegex = /<(?:.|\n)*?>/gm;
	const separatorRegex = /;&nbsp;|;/;
	const listify = (attribute) =>
		attribute
			.split(separatorRegex)
			.map((sponsor) => sponsor.replace(htmlRegex, '').trim());
	return data.map((trial) => ({
		candidate: trial.Candidate,
		mechanism: trial.Mechanism,
		sponsors: listify(trial.Sponsor),
		details: trial.Details.replace(htmlRegex, ''),
		trialPhase: trial['Trial Phase'],
		institutions: listify(trial.Institution)
	}));
};

const groupVaccineDataByCountry = (vaccineData) => {
	const vaccineDataObject = {},
		worldVaccineData = {},
		otherJurisdictions = {};
	vaccineData.forEach((timelineData) => {
		// For jurisidctions like Wales, Scotland e.t.c which don't have iso3 code
		if (timelineData.iso_code === '') {
			if (otherJurisdictions[timelineData.iso_code] === undefined) {
				otherJurisdictions[timelineData.iso_code] = [timelineData];
				return;
			}
			otherJurisdictions[timelineData.iso_code].push(timelineData);
			return;
		}

		// For world aggregate

		if (timelineData.iso_code === 'OWID_WRL') {
			if (worldVaccineData[timelineData.iso_code] === undefined) {
				worldVaccineData[timelineData.iso_code] = [timelineData];
				return;
			}
			worldVaccineData[timelineData.iso_code].push(timelineData);
			return;
		}

		// Countries with iso3 code

		if (vaccineDataObject[timelineData.iso_code] === undefined) {
			vaccineDataObject[timelineData.iso_code] = [timelineData];
			return;
		}
		vaccineDataObject[timelineData.iso_code].push(timelineData);
	});
	return { vaccineDataObject, worldVaccineData, otherJurisdictions };
};

const generateCountrySpecificVaccineData = (timelineData) => {
	const timeline = {};
	// All countries have missing value for daily_vaccinations field on the first day. This could be intentional omission
	// or they are participants in medical trial. Needs to be cross checked.
	/* eslint-disable */
  const { total_vaccinations, daily_vaccinations } = timelineData[0];
  if (daily_vaccinations === "") {
    timelineData[0].daily_vaccinations = total_vaccinations;
  }
  timelineData.forEach((timelineObject) => {
    const {
      total_vaccinations,
      daily_vaccinations,
      total_vaccinations_per_hundred,
      daily_vaccinations_per_million,
    } = timelineObject;
    if (daily_vaccinations === "" || total_vaccinations === "") return;
    timeline[timelineObject.date] = {
      total_vaccinations: parseInt(total_vaccinations),
      daily_vaccinations: parseInt(daily_vaccinations),
      total_vaccinations_per_hundred:
        total_vaccinations_per_hundred === ""
          ? 0
          : parseInt(total_vaccinations_per_hundred),
      daily_vaccinations_per_million:
        daily_vaccinations_per_million === ""
          ? 0
          : parseInt(daily_vaccinations_per_million),
    };
  });
  return { country: "", countryInfo: null, timeline };
};
/* eslint-enable */
/**
 * Fills redis with vaccinination coverage data
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */

async function getVaccineCoverageData(keys, redis) {
	try {
		const data = await axios.get(
			'https://covid.ourworldindata.org/data/vaccinations/vaccinations.csv'
		);
		const parsedData = await csv({
			noheader: false,
			output: 'json'
		}).fromString(data.data);

		const vaccineCoverageData = [];
		const { vaccineDataObject } = groupVaccineDataByCountry(parsedData);

		Object.keys(vaccineDataObject).forEach((iso3CountryCode) => {
			const countryMetaData = countries.find(
				(metaData) => metaData.iso3 === iso3CountryCode
			);
			const countryVaccineData = generateCountrySpecificVaccineData(
				vaccineDataObject[iso3CountryCode]
			);

			if (countryMetaData) {
				countryVaccineData.country = countryMetaData.country;
				countryVaccineData.countryInfo = countryMetaData;
				vaccineCoverageData.push(countryVaccineData);
			}
		});
		redis.set(keys.vaccine_coverage, JSON.stringify(vaccineCoverageData));
	} catch (error) {
		logger.err('Error: Requesting vaccine coverage data failed!', error);
	}
}

/**
 * Fills redis with vaccine data
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */
const getVaccineData = async (keys, redis) => {
	const dateObj = new Date();
	const month = dateObj.getUTCMonth() + 1;
	const year = dateObj.getUTCFullYear();

	let dataExists = false;
	let counter = 0;
	do {
		try {
			const dateString = `${year}${month}${counter
				.toString()
				.padStart(2, '0')}`;
			const cookieJar = new tough.CookieJar();
			const { data } = await axios.get(
				`https://www.raps.org/RAPS/media/news-images/data/${dateString}-vax-tracker-Craven.csv`,
				{
					jar: cookieJar,
					withCredentials: true,
					headers: {
						'User-Agent':
              'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
						'Accept-Language': 'en-us',
						'Content-Language': 'en-us'
					}
				}
			);
			const parsedData = await csv().fromString(data);
			redis.set(
				keys.vaccine,
				JSON.stringify({
					source:
            'https://www.raps.org/news-and-articles/news-articles/2020/3/covid-19-vaccine-tracker',
					totalCandidates: parsedData.length.toString(),
					phases: phaseData(parsedData),
					data: cleanData(parsedData)
				})
			);
			dataExists = true;
		} catch (err) {
			logger.err('Error: Requesting vaccine CSV data failed!', err);
		}
		counter++;
	} while (dataExists === false && counter < 30);
};

module.exports = { getVaccineData, getVaccineCoverageData };
