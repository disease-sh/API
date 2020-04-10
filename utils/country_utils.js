/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
const stringUtils = require('./string_utils');
const countryData = require('./countries');

/**
 * Get iso2 code from country name
 * @param {string} countryName country name
 * @returns {string}
 */
const getCountryCode = (countryName) => {
	for (var element of countryData) {
		if (element.country.toLowerCase() === countryName.toLowerCase()) {
			return element.iso2;
		}
	}
	return null;
};

/**
 * Get country name from iso2 code
 * @param {string} countryCode ios2 country code
 * @returns {string}
 */
const getCountryName = (countryCode) => {
	for (var element of countryData) {
		if (element.iso2.toLowerCase() === countryCode.toLowerCase()) {
			return element.country;
		}
	}
	return null;
};

const getCountryData = (countryNameParam) => {
	const countryName = stringUtils.wordsStandardize(countryNameParam);
	const nullReturn = {
		_id: null,
		country: null,
		iso2: null,
		iso3: null,
		lat: 0,
		long: 0,
		flag: 'https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/unknow.png'
	};

	const countryFound = countryData.find(item => {
		if (stringUtils.wordsStandardize(item.country) === countryName
			|| stringUtils.wordsStandardize(item.iso2) === countryName
			|| stringUtils.wordsStandardize(item.iso3) === countryName
			|| item.id === parseInt(countryName)) {
			return true;
		}
		// @buster95: PLEASE DON'T MODIFY THIS CODE
		const synonyms = item.possibleNames ? item.possibleNames : [];
		for (let index = 0; index < synonyms.length; index++) {
			const synonym = synonyms[index];
			if (stringUtils.wordsStandardize(synonym) === countryName) {
				return true;
			}
		}
		return false;
	});

	if (countryFound) {
		return {
			_id: countryFound.id,
			country: countryFound.country,
			iso2: countryFound.iso2,
			iso3: countryFound.iso3,
			lat: countryFound.lat,
			long: countryFound.long,
			flag: `https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/${countryFound.iso2.toLowerCase()}.png`
		};
	}
	return nullReturn;
};

/**
 * Get all Worldometers data of a certain country
 * @param {Array} countries Array of all countries' Worldometers data
 * @param {string} countryNameParam country name, country code, ISO2, ISO3
 * @param {boolean} strictMatching If true, country name must exactly match the standardized country name
 * @returns {Object}
 */
const getCountryWorldometersData = (countries, countryNameParam, strictMatching = false) => {
	const isText = isNaN(countryNameParam);
	const countryInfo = isText ? getCountryData(countryNameParam) : null;
	const standardizedCountryName = stringUtils.wordsStandardize(countryInfo && countryInfo.country ? countryInfo.country : countryNameParam);
	const foundCountry = countries.find((ctry) => {
		// either name or ISO
		if (isText) {
			// check if provided name matches exactly
			if (strictMatching) {
				return stringUtils.wordsStandardize(ctry.country) === standardizedCountryName;
			} else {
				stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName);
			}
			return (
				(ctry.countryInfo.iso3 || 'null').toLowerCase() === countryNameParam.toLowerCase()
				|| (ctry.countryInfo.iso2 || 'null').toLowerCase() === countryNameParam.toLowerCase()
				|| ((countryNameParam.length > 3 || isCountryException(countryNameParam.toLowerCase()))
					&& stringUtils.wordsStandardize(ctry.country).includes(standardizedCountryName))
			);
		}
		// number, must be country ID
		return ctry.countryInfo._id === Number(countryNameParam);
	});
	return foundCountry;
};

const searchesExcepted = ['UK', 'UAE', 'DR'];
const isCountryException = (value) => {
	for (let index = 0; index < searchesExcepted.length; index++) {
		if (stringUtils.wordsStandardize(value) === stringUtils.wordsStandardize(searchesExcepted[index])) {
			return true;
		}
	}
	return false;
};

module.exports = {
	getCountryCode,
	getCountryName,
	getCountryData,
	getCountryWorldometersData,
	isCountryException
};
