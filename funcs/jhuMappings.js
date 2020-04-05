const axios = require('axios');
const csv = require('csvtojson');

const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv';

async function getData() {
	const response = await axios.get(
		`${base}`
	);
	return response;
}

/**
 * Sets redis store full of JHU country mapping scraped from their hosted CSV
 * @param {string} 	keys 	JHU data redis key
 * @param {Object} 	redis 	Redis instance
 */
const jhuMappings = async (keys, redis) => {
	const response = await getData();

	const parsed = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(response.data);

	const result = [];
	parsed.splice(1).forEach((entry) => {
		result.push({
			uid: entry[0],
			iso2: entry[1],
			iso3: entry[2] || null,
			fips: entry[3] || null,
            admin2: entry[4] || null,
            provinceState: entry[5] || null,
            countryRegion: entry[6],
            lat: entry[7],
            long: entry[8],
            combinedKey: entry[9]
		});
	});
	const string = JSON.stringify(result);
	redis.set(keys.jhu_mappings, string);
	console.log(`Updated JHU CSSE mappings: ${result.length} mappings`);
};

module.exports = {
	jhuMappings
};
