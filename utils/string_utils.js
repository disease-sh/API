const wordsStandardize = (word) => word ? word.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'null';

const wordToBoolean = (word) => word === '' || (word ? word.toLowerCase() === 'true' || word === '1' : false);

const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');

module.exports = {
	wordsStandardize,
	wordToBoolean,
	splitQuery
};
