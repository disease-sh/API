const axios = require('axios');
const logger = require('../../../utils/logger');

const stdString = /(\[[^\]]*\])/g;

/**
 * Transform province data from Austrian government site
 * @param 		{string} 	cases	String containing javascript code for case data
 * @param 		{string} 	deathsRecovered	String containing javascript code for deaths and recovered data
 * @returns 	{Object}				Object containing the parsed data
 */
const transformProvinces = (cases, deathsRecovered) => {
	const data = [cases, deathsRecovered].map(value => JSON.parse(value.split('\n')[0].match(stdString)[0]));
	// eslint-disable-next-line id-length
	return data[0].map((province, i) => ({
		province: data[1][i].label,
		cases: parseInt(province.y) || null,
		recovered: parseInt(data[1][i].y) || null,
		deaths: parseInt(data[1][i].z) || null
	}));
};

/**
 * Transform district data from Austrian government site
 * @param 		{Object} 	districts		Object containing json data
 * @returns 	{Object}					Object containing the parsed data
 */
const transformDistricts = (districts) => districts.objects.bezirke.geometries.map(geo => ({
	district: geo.properties.name,
	cases: parseInt(geo.properties.Anzahl) || null,
	population: parseInt(geo.properties.Einwohner) || null
}));

/**
 * Transform data from Austrian government site, either casesByAge or percentageBySex
 * @param 		{string} 	toTransform		String containing javascript code
 * @returns 	{Object}					Object containing the parsed data
 */
const transformBySexOrAge = (toTransform) => {
	const data = { };
	const labelMapping = { männlich: 'male', weiblich: 'female' };
	// eslint-disable-next-line no-return-assign
	JSON.parse(toTransform.split('\n')[0].match(stdString)[0]).forEach((line) => data[labelMapping[line.label] || line.label] = line.y);
	return data;
};

/**
 * Scrapes Austrian government javascript data and returns an object containing this data
 */
const austriaData = async () => {
	try {
		const bundeslandFälle = (await axios.get('http://info.gesundheitsministerium.at/data/Bundesland.js')).data;
		const bundeslandTodGenesen = (await axios.get('http://info.gesundheitsministerium.at/data/GenesenTodesFaelleBL.js')).data;
		const bezirk = (await axios.get('http://info.gesundheitsministerium.at/data/austria_map.json')).data;
		const geschlechterverteilungFälle = (await axios.get('http://info.gesundheitsministerium.at/data/Geschlechtsverteilung.js')).data;
		const altersverteilungFälle = (await axios.get('http://info.gesundheitsministerium.at/data/Altersverteilung.js')).data;
		const geschlechterverteilungTode = (await axios.get('http://info.gesundheitsministerium.at/data/VerstorbenGeschlechtsverteilung.js')).data;
		const altersverteilungTode = (await axios.get('http://info.gesundheitsministerium.at/data/AltersverteilungTodesfaelle.js')).data;
		return {
			updated: Date.now(),
			provinces: transformProvinces(bundeslandFälle, bundeslandTodGenesen),
			districts: transformDistricts(bezirk),
			percentageBySex: {
				cases: transformBySexOrAge(geschlechterverteilungFälle),
				deaths: transformBySexOrAge(geschlechterverteilungTode)
			},
			casesByAge: transformBySexOrAge(altersverteilungFälle),
			deathsByAge: transformBySexOrAge(altersverteilungTode)
		};
	} catch (err) {
		logger.err('Error: Requesting Austria Gov Data failed!', err);
		return null;
	}
};

module.exports = austriaData;
