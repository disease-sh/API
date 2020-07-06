
const wordsStandardize = (word) => word ? word.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : null;


const wordToBoolean = (word) => word ? ['true', '1'].includes(word.toString()) : false;

const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');

const fixApostrophe = (country) => {
	country.country = country.country.replace(/"/g, '\'');
	return country;
};


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
