const wordsStandardize = function (word) {
	const wordStandard = word.trim().toLowerCase();
	return wordStandard.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

module.exports = {
	wordsStandardize,
};
