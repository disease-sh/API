const stringUtils = require('./string_utils');
const countryData = require('./countries');

/**
 * Get iso2 code from country name
 * @param {string} countryName country name
 * @returns {string} iso2 country code
 */
const getCountryCode = (countryName) =>	countryData.find(country => country.country.toLowerCase() === countryName.toLowerCase()).iso2;

/**
 * Get country name from iso2 code
 * @param {string} countryCode ios2 country code
 * @returns {string}
 */
const getCountryName = (countryCode) =>	countryData.find(country => country.iso2.toLowerCase() === countryCode.toLowerCase()).country;

const getCountryData = (countryNameParam) => {
	const countryName = stringUtils.wordsStandardize(countryNameParam);
	const nullReturn = { _id: null, country: null, iso2: null, iso3: null, lat: 0, long: 0, flag: 'https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/unknow.png' };
	const countryFound = countryData.find(item => (stringUtils.wordsStandardize(item.country) === countryName
		|| stringUtils.wordsStandardize(item.iso2) === countryName
		|| stringUtils.wordsStandardize(item.iso3) === countryName
		|| item.id === parseInt(countryName))
			|| !!(item.possibleNames ? item.possibleNames : []).find(synonym => stringUtils.wordsStandardize(synonym) === countryName));

	return countryFound ? {
		_id: countryFound.id,
		country: countryFound.country,
		iso2: countryFound.iso2,
		iso3: countryFound.iso3,
		lat: countryFound.lat,
		long: countryFound.long,
		flag: `https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/${countryFound.iso2.toLowerCase()}.png`
	} : nullReturn;
};

const fuzzySearch = (ctry, nameParam, standardizedName, selector) => ((ctry.countryInfo || {}).iso3 || '').toLowerCase() === nameParam.toLowerCase()
	|| ((ctry.countryInfo || {}).iso2 || '').toLowerCase() === nameParam.toLowerCase()
	|| ((nameParam.length > 3 || isCountryException(nameParam.toLowerCase()))
	&& stringUtils.wordsStandardize(ctry[selector]).includes(standardizedName));

/**
 * Get all Worldometers data of a certain country
 * @param {Array} data Array of all countries Worldometers data
 * @param {string} nameParam country name, country code, ISO2, ISO3
 * @param {boolean} strictMatching If true, country name must exactly match the standardized country name
 * @param {boolean} continentMode Tells the algorithm to either use 'continent' or 'country' as a selector to use in comparison
 * @returns {Object} country that was found
 */
const getWorldometersData = (data, nameParam, strictMatching, continentMode) => {
	const selector = continentMode ? 'continent' : 'country';
	const isText = isNaN(nameParam);
	const countryInfo = isText ? getCountryData(nameParam) : {};
	const standardizedName = stringUtils.wordsStandardize(countryInfo.country ? countryInfo.country : nameParam);
	return data.find((ctry) => !isText ? ctry.countryInfo && ctry.countryInfo._id === Number(nameParam)
		: strictMatching ? stringUtils.wordsStandardize(ctry[selector]) === standardizedName : fuzzySearch(ctry, nameParam, standardizedName, selector));
};

const countryExceptions = ['UK', 'UAE', 'DR'];
/**
 * Check for country exception when searching countries
 * @param {string} countryname name of the country to be searched
 * @returns {boolean}
 */
const isCountryException = (countryname) => !!countryExceptions.find(exception => stringUtils.wordsStandardize(countryname) === stringUtils.wordsStandardize(exception));

module.exports = {
	getCountryCode,
	getCountryName,
	getCountryData,
	getWorldometersData,
	isCountryException
};
