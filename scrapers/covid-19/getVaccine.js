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

const groupVaccineDataByCountry = (vaccineData) => {
	const groupedByCountryVaccineDataObject = {},
		worldVaccineDataObject = {},
		otherJurisdictionsVaccineDataObject = {};

	const getTimelineDataFromIsoCode = (isoCode) => {
		switch (isoCode) {
			case '': return otherJurisdictionsVaccineDataObject;
			case 'OWID_WRL': return worldVaccineDataObject;
			default: return groupedByCountryVaccineDataObject;
		}
	};

	vaccineData.forEach((timelineData) => {
		const dataObject = getTimelineDataFromIsoCode(timelineData.iso_code);
		if (dataObject[timelineData.iso_code] === undefined) dataObject[timelineData.iso_code] = [timelineData];
		else dataObject[timelineData.iso_code].push(timelineData);
	});
	return {
		groupedByCountryVaccineDataObject,
		worldVaccineDataObject,
		otherJurisdictionsVaccineDataObject
	};
};

/**
 * Formats vaccine coverage date from "YYYY:MM:DD" format to be consistent with other date formats returned by the API
 * @param {string} vaccineCoverageDate
 * @returns {string}
 */

const formatVaccineCoverageDate = (vaccineCoverageDate) => {
	const { 0: year, 1: month, 2: day } = vaccineCoverageDate.split('-');
	return `${parseInt(month)}/${parseInt(day)}/${year.slice(-2)}`;
};

/**
 * Generates timeline data in the form {"date": {daily: 0, total: 0, totalPerHundred: 0, dailyPerMillion: 0}} from Dec 1, 2020 till the day before vaccination started
 * @param {object}   startDate Date from which we start populating timelineObject with value
 * @param {object}   endDate Date upto which we populate timelineObject with value (excludes endDate)
 * @param {number}   value Value for populating total field
 * @param {object}   timelineObject Timeline object
 * @returns {object}
 */

function getTimeline(startDate, endDate, value, timelineObject) {
	const timeline = { ...timelineObject };
	while (startDate.getTime() < endDate.getTime()) {
		const date = startDate.getDate(),
			month = startDate.getMonth() + 1,
			year = `${startDate.getFullYear()}`;
		timeline[`${month}/${date}/${year.slice(-2)}`] = {
			total: value,
			daily: 0,
			totalPerHundred: 0,
			dailyPerMillion: 0
		};
		startDate.setDate(startDate.getDate() + 1);
	}
	return timeline;
}

/**
 * Checks if vaccine coverage data was last updated today
 * @param {object} dateForLatestUpdate Date when vaccine data was last updated at 00:00:00 hours
 * @param {object} dateToday           Date today at 00:00:00 hours
 * @returns {boolean}
 */

const isVaccineCoverageDataLastUpdatedToday = (dateForLatestUpdate, dateToday) => dateToday.getDate() === dateForLatestUpdate.getDate()
	&& dateToday.getMonth() === dateForLatestUpdate.getMonth()
	&& dateToday.getFullYear() === dateForLatestUpdate.getFullYear();

/**
 * Formats raw timeline data
 * @param {array} timelineData An array of raw timeline data
 * @returns {object}
 */

const generateSpecificCountryVaccineData = (timelineData) => {
	/*
	 All countries have missing value for daily_vaccinations field on the first day.
	 This could be intentional omission because it is expected the total and daily
	 vaccinations to be the same on first day. Needs to be cross checked though.
	 */
	if (timelineData[0].daily_vaccinations === '') {
		/* eslint-disable */
		timelineData[0].daily_vaccinations = timelineData[0].total_vaccinations;
		/* eslint-enable */
	}

	const firstVaccinationDate = timelineData[0].date;
	const { 0: vaccinationStartYear, 1: vaccinationStartMonth, 2: vaccinationStartDate } = firstVaccinationDate.split('-');
	const vaccinationStartDateObject = new Date(parseInt(vaccinationStartYear), parseInt(vaccinationStartMonth) - 1, parseInt(vaccinationStartDate));
	const dayZero = new Date(2020, 11, 1);

	/*
	All country-specific vaccine coverage data starts from Dec 1, 2020 irrespective of
	when the said country rolled out mass vaccination programme. Dec 1, 2020 is considered the
	baseline date because no country has any record of vaccination before December in the data
	source. The earliest vaccination programmes started mid to late Dec 2020. The data source
	doesn't include data for clinical trial vaccine doses administered.
	*/
	const timeline = getTimeline(dayZero, vaccinationStartDateObject, 0, {});
	let totalFromDailyVaccinationsTracker = 0;
	timelineData.forEach((timelineObject) => {
		const {
			total_vaccinations: total,
			daily_vaccinations: daily,
			total_vaccinations_per_hundred: totalPerHundred,
			daily_vaccinations_per_million: dailyPerMillion,
			date
		} = timelineObject;
		/*
		This tracks aggregate daily doses of vaccine administered from first day. Take note
		some countries don't report daily vaccines administered. The data source therefore
		computes doses for the missing dates as explained in the issue in the link below. This
		tracker helps fill the missing data points in the total using the already estimated daily
		doses.https://github.com/owid/covid-19-data/issues/256
		*/
		if (total === '') {
			totalFromDailyVaccinationsTracker += daily === '' ? 0 : parseInt(daily);
		} else {
			totalFromDailyVaccinationsTracker = parseInt(total);
		}
		timeline[formatVaccineCoverageDate(date)] = {
			total: total === '' ? totalFromDailyVaccinationsTracker : parseInt(total),
			daily: daily === '' ? 0 : parseInt(daily),
			totalPerHundred: totalPerHundred === '' ? 0 : parseInt(totalPerHundred),
			dailyPerMillion: dailyPerMillion === '' ? 0 : parseInt(dailyPerMillion)
		};
	});

	const lastVaccinationDataReportedOn = timelineData[timelineData.length - 1].date;
	const { 0: year, 1: month, 2: date } = lastVaccinationDataReportedOn.split('-');
	const lastVaccinationDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(date));
	// Today must be today's date at midnight
	const today = new Date(new Date().setHours(0, 0, 0, 0));

	if (isVaccineCoverageDataLastUpdatedToday(lastVaccinationDate, today) === true) {
		return { country: '', countryInfo: null, timeline };
	}

	// If data was last updated day/days before today, the remaining days without update must all have the last total
	today.setDate(today.getDate() + 1);
	lastVaccinationDate.setDate(lastVaccinationDate.getDate() + 1);
	const { total: latestTotalVaccination } = timeline[Object.keys(timeline).slice(-1)[0]];
	const updatedTimeline = getTimeline(lastVaccinationDate, today, latestTotalVaccination, timeline);
	return { country: '', countryInfo: null, timeline: updatedTimeline };
};

/**
 * Fills redis with vaccination coverage data
 * @param 	{string} 	keys	 Redis keys
 * @param 	{Object} 	redis 	 Redis instance
 */

async function getVaccineCoverageData(keys, redis) {
	try {
		const data = await axios.get(
			'https://covid.ourworldindata.org/data/vaccinations/vaccinations.csv'
		);
		const parsedVaccineData = await csv({
			noheader: false,
			output: 'json'
		}).fromString(data.data);

		const countriesVaccineCoverageData = [];
		const {
			groupedByCountryVaccineDataObject,
			worldVaccineDataObject
		} = groupVaccineDataByCountry(parsedVaccineData);

		Object.keys(groupedByCountryVaccineDataObject).forEach((iso3CountryCode) => {
			const countryMetaData = countries.find((metaData) => metaData.iso3 === iso3CountryCode);
			const specifiCountryVaccineData = generateSpecificCountryVaccineData(groupedByCountryVaccineDataObject[iso3CountryCode]);
			if (countryMetaData) {
				specifiCountryVaccineData.country = countryMetaData.country;
				specifiCountryVaccineData.countryInfo = countryMetaData;
				countriesVaccineCoverageData.push(specifiCountryVaccineData);
			}
		}
		);
		// iso3 country code used for the world in the dataset is OWID_WRL
		const { timeline: worldVaccineCoverageData } = generateSpecificCountryVaccineData(worldVaccineDataObject.OWID_WRL);
		redis.set(
			keys.vaccine_coverage,
			JSON.stringify({ countries: countriesVaccineCoverageData, world: worldVaccineCoverageData })
		);
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
