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
 * @param {Array} data Array of all countries or continents Worldometers data
 * @param {string} nameParam continent name, country name, country code, ISO2, ISO3
 * @param {boolean} strictMatching If true, country/continent name must exactly match the standardized country/continent name
 * @param {boolean} continents to tell the algorithm to either check the continent property or country property
 * @returns {Object}
 */
const getWorldometersData = (data, nameParam, strictMatching, continents = false) => {
	const selector = continents ? 'continent' : 'country';
	const isText = isNaN(nameParam);
	const countryInfo = isText ? getCountryData(nameParam) : {};
	const standardizedName = stringUtils.wordsStandardize(countryInfo && countryInfo.country ? countryInfo.country : nameParam);
	const found = data.find((ctry) => {
		// either name or ISO
		if (isText) {
			// check if provided name matches exactly
			if (strictMatching) {
				return stringUtils.wordsStandardize(ctry[selector]) === standardizedName;
			} else {
				stringUtils.wordsStandardize(ctry[selector]).includes(standardizedName);
			}
			return (
				((ctry.countryInfo || {}).iso3 || '').toLowerCase() === nameParam.toLowerCase()
				|| ((ctry.countryInfo || {}).iso2 || '').toLowerCase() === nameParam.toLowerCase()
				|| ((nameParam.length > 3 || isCountryException(nameParam.toLowerCase()))
					&& stringUtils.wordsStandardize(ctry[selector]).includes(standardizedName))
			);
		}
		// number, must be country ID
		return ctry.countryInfo._id === Number(nameParam);
	});
	return found;
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
	getWorldometersData,
	isCountryException
};
