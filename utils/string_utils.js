const wordsStandardize = (word) => word ? word.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'null';

const wordToBoolean = (word) => word ? ['true', '1'].includes(word.toString()) : false;

const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');

module.exports = {
	wordsStandardize,
	wordToBoolean,
	splitQuery
};
