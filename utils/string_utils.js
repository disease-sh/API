module.exports = {
	wordsStandardize: (word) => word ? word.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'null',
	wordToBoolean: (word) => word === '' || (word ? word.toLowerCase() === 'true' || word === '1' : false),
	splitQuery: (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|')
};
