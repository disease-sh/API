const wordsStandardize = (word) => {
	if (word) {
		const wordStandard = word.trim().toLowerCase();
		return wordStandard.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}
	return 'null';
};

const wordToBoolean = word => {
	if (word === '') return true;
	if (word) return word.toLowerCase() === 'true' || word === '1' ? true : false;
	return false;
};

const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');

module.exports = {
	wordsStandardize,
	wordToBoolean,
	splitQuery
};
