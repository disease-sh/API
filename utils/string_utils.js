const wordsStandardize = function (word) {
    var word_standard = word.trim().toLowerCase();
    return word_standard.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
    wordsStandardize
}