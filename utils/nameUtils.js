const stringUtils = require('./stringUtils');
const countryData = require('./countries');
const continentData = require('./continents');

/**
 * Transform null values to 0 (DEEPLY TRANSFORM)
 * @param {Object} object country/continent object
 * @returns  {Object} 		transformed object
 */
const transformNull = (object) => {
	if (typeof object !== 'object') {
		return object;
	}
	// eslint-disable-next-line no-return-assign
	Object.entries(object).forEach((entry) => entry[0] !== 'countryInfo' && (object[entry[0]] = entry[1] === null ? 0 : transformNull(entry[1])));
	return object;
};

/**
 * Get iso2 code from country name
 * @param 	{string} 	countryName 	country name
 * @returns {string} 					iso2 country code
 */
const getCountryCode = (countryName) => countryData.find(country => country.country.toLowerCase() === countryName.toLowerCase()).iso2;

/**
 * Get country name from iso2 code
 * @param 	{string} 	countryCode 	ios2 country code
 * @returns {string}
 */
const getCountryName = (countryCode) => countryData.find(country => country.iso2.toLowerCase() === countryCode.toLowerCase()).country;

/**
 * Gets all country data given a name
 * @param 	{string} 	countryNameParam 	country name
 * @returns {Object} 						id, country, iso codes, lat/long, and flag for a country
 */
const getCountryData = (countryNameParam) => {
	const countryName = stringUtils.wordsStandardize(countryNameParam);
	const nullReturn = { _id: null, country: null, iso2: null, iso3: null, lat: 0, long: 0, flag: 'https://disease.sh/assets/img/flags/unknown.png' };
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
		flag: `https://disease.sh/assets/img/flags/${countryFound.iso2.toLowerCase()}.png`
	} : nullReturn;
};

const getContinentData = (continent) => continentData[continent];

/**
 * Match country name with iso codes or alternate names
 * @param 	{Object} 	ctry 				country object with data fields
 * @param 	{string} 	nameParam 			input country name
 * @param 	{string} 	standardizedName 	standardized country name
 * @param 	{string} 	selector 			country or continent
 * @returns {boolean} 						If the country matches a fuzzy search on a countries.js object
 */
const fuzzySearch = (ctry, nameParam, standardizedName, selector) => ((ctry.countryInfo || {}).iso3 || '').toLowerCase() === nameParam.toLowerCase()
	|| ((ctry.countryInfo || {}).iso2 || '').toLowerCase() === nameParam.toLowerCase()
	|| ((nameParam.length > 3 || isCountryException(nameParam.toLowerCase()))
		&& stringUtils.wordsStandardize(ctry[selector]).includes(standardizedName));

/**
 * Get all Worldometers data of a certain country
 * @param 	{Array} 	data 				Array of all countries Worldometers data
 * @param 	{string}	nameParam 			country name, country code, ISO2, ISO3
 * @param 	{boolean} 	strictMatching 		If true, country name must exactly match the standardized country name
 * @param 	{boolean} 	continentMode 		Tells the algorithm to either use 'continent' or 'country' as a selector to use in comparison
 * @returns {Object} 						country that was found
 */
const getWorldometersData = (data, nameParam, strictMatching, continentMode) => {
	const selector = continentMode ? 'continent' : 'country';
	const isText = isNaN(nameParam);
	const countryInfo = isText ? getCountryData(nameParam) : {};
	const standardizedName = stringUtils.wordsStandardize(countryInfo.country ? countryInfo.country : nameParam);
	return data.find((ctry) => !isText ? ctry.countryInfo && ctry.countryInfo._id === Number(nameParam)
		: strictMatching ? stringUtils.wordsStandardize(ctry[selector]) === standardizedName : fuzzySearch(ctry, nameParam, standardizedName, selector));
};

/**
 * Check for country exception when searching countries
 * @param 	{string} 	countryname 	name of the country to be searched
 * @returns {boolean}
 */
const isCountryException = (countryname) => !!['UK', 'UAE', 'DR'].find(exception => stringUtils.wordsStandardize(countryname) === stringUtils.wordsStandardize(exception));

/**
 * Get list of country names from continent name and countries list
 * @param {string} 	continent 	name of the continent
 * @param {Array} 	countries 	countries
 * @returns {Array}
 */
const getCountriesFromContinent = (continent, countries) => countries
	.filter(country => stringUtils.wordsStandardize(country.continent).includes(stringUtils.wordsStandardize(continent)))
	.map(country => country.country || 'no data');

module.exports = {
	getCountryCode,
	getCountryName,
	getCountryData,
	getWorldometersData,
	isCountryException,
	getCountriesFromContinent,
	transformNull,
	getContinentData
};
