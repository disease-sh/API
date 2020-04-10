const wordsStandardize = (word) => {
	if (word) {
		const wordStandard = word.trim().toLowerCase();
		return wordStandard.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}
	return 'null';
};

const wordToBoolean = word => {
	if (word === '') return true
	if (word) {
		if (word.toLowerCase() === 'true' || word === '1') return true
		else if (word.toLowerCase() === 'false' || word === '0') return false
		else return Boolean(word);
	}
	return false;
}

const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');

module.exports = {
	wordsStandardize,
	wordToBoolean,
	splitQuery
};
