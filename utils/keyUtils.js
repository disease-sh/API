const keys = require('./keysTranslation');

/**
 * Returns renamed keys based on country
 * @param {string} country iso2 for a country
 * @param {Array} data country array of places
 * @returns {Array} Country data for each place with the new keys
 */
const renameKeys = (data, country) => {
	const newKeys = keys[country];
	return data.map((element) =>
		Object.keys(element)
			.reduce((acc, key) => ({
				...acc,
				...{ [newKeys[key] || key]: element[key] }
			}), {}));
};

module.exports = {
	renameKeys
};
