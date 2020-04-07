const wordsStandardize = (word) => {
	if (word) {
		const wordStandard = word.trim().toLowerCase();
		return wordStandard.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}
	return 'null';
};

const splitQuery = (query) => query.indexOf('|') === -1 ? query.split(',') : query.split('|');

module.exports = {
	wordsStandardize,
	splitQuery
};
