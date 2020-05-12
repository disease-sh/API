const axios = require('axios');
const logger = require('../../utils/logger');

/**
 * Transform province data from Austrian government site
 * @param 	{string} 	provinces		string containing javascript code
 * @returns {Object}				      Object containing the parsed data
 */
const transformProvinces = (provinces) => {
	const data = JSON.parse(provinces.split('\n')[0].match(/(\[[^\]]*\])/g)[0]);
	// eslint-disable-next-line id-length
	const provinceMapper = { W: 'Vienna', V: 'Vorarlberg', T: 'Tyrol', Stmk: 'Styria', Sbg: 'Salzburg',
		OÖ: 'Upper Austria', NÖ: 'Lower Austria', Ktn: 'Carinthia', Bgld: 'Burgenland' };
	return data.map(province => ({
		province: provinceMapper[province.label],
		cases: parseInt(province.y)
	}));
};

/**
 * Transform district data from Austrian government site
 * @param 	{Object} 	districts		Object containing json data
 * @returns {Object}				      Object containing the parsed data
 */
const transformDistricts = (districts) => districts.objects.bezirke.geometries.map(geo => ({
	district: geo.properties.name,
	cases: parseInt(geo.properties.Anzahl),
	population: parseInt(geo.properties.Einwohner)
}));

/**
 * Transform data from Austrian government site, either casesByAge or percentageBySex
 * @param 	{string} 	toTransform	string containing javascript code
 * @returns {Object}				      Object containing the parsed data
 */
const transformBySexOrAge = (toTransform) => {
	const data = { };
	const labelMapper = { männlich: 'male', weiblich: 'female' };
	// eslint-disable-next-line no-return-assign
	JSON.parse(toTransform.split('\n')[0].match(/(\[[^\]]*\])/g)[0]).forEach(line => data[labelMapper[line.label] || line.label] = line.y);
	return data;
};

/**
 * Scrapes Austrian government javascript data and returns an object containing this data
 */
const austriaData = async () => {
	try {
		const bundesland = (await axios.get('https://info.gesundheitsministerium.at/data/Bundesland.js')).data;
		const bezirk = (await axios.get('https://info.gesundheitsministerium.at/data/austria_map.json')).data;
		const geschlechterverteilung = (await axios.get('https://info.gesundheitsministerium.at/data/Geschlechtsverteilung.js')).data;
		const altersverteilung = (await axios.get('https://info.gesundheitsministerium.at/data/Altersverteilung.js')).data;
		return {
			updated: Date.now(),
			provinces: transformProvinces(bundesland),
			districts: transformDistricts(bezirk),
			percentageBySex: transformBySexOrAge(geschlechterverteilung),
			casesByAge: transformBySexOrAge(altersverteilung)
		};
	} catch (err) {
		logger.err('Error: Requesting Austria Gov Data failed!', err);
		return null;
	}
};

module.exports = austriaData;
