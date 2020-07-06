/**
 * Returns a standardized version of the word
 * @param 	{string} 	word 	word to standardize
 * @returns 	{string} 		standardized value
 */
const wordsStandardize = (word) => word ? word.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

/**
 * Returns the correct boolean value for a parameter
 * @param 	{string} 	word 	parameter received
 * @returns 	{boolean} 		resulting boolean value
 */
const wordToBoolean = (word) => word ? ['true', '1'].includes(word.toString()) : false;

/**
 * Splits a query
 * @param 	{string} 	query 	received query
 * @returns 	{Array} 		list of arguments
 */
const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');

/**
 * Fixes unwanted apostrophes in the country names
 * @param 	{Object} 	country 	country
 * @returns 	{Object} 			cleaned country
 */
const fixApostrophe = (country) => {
	country.country = country.country.replace(/"/g, '\'');
	return country;
};

/**
 * Returns correct value for lastdays param given string input
 * @param 	{string} 	lastdays 	lastdays param
 * @returns 	{number} 			correct lastdays value in integer form
 */
const getLastDays = (lastdays) => {
	if (lastdays && lastdays === 'all') lastdays = Number.POSITIVE_INFINITY;
	if (!lastdays || isNaN(lastdays)) lastdays = 30;
	return lastdays;
};

module.exports = {
	wordsStandardize,
	wordToBoolean,
	splitQuery,
	fixApostrophe,
	getLastDays
};
