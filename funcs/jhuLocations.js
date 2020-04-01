const axios = require('axios');
const csv = require('csvtojson');

const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';

async function getData() {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	const dd = date.getDate().toString().padStart(2, '0');
	const mm = (date.getMonth() + 1).toString().padStart(2, '0');
	const yyyy = date.getFullYear();
	const dateString = `${mm}-${dd}-${yyyy}`;
	const response = await axios.get(
		`${base}/${dateString}.csv`
	);
	console.log(
		`USING ${dateString}.csv CSSEGISandData`
	);
	return response;
}

const jhudata = async (keys, redis) => {
	const response = await getData();

	const parsed = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(response.data);

	// to store parsed data
	const result = [];

	parsed.splice(1).forEach((loc) => {
		result.push({
			country: loc[3],
			province: loc[2] || null,
			city: loc[1] || null,
			updatedAt: loc[4],
			stats: {
				confirmed: loc[7],
				deaths: loc[8],
				recovered: loc[9]
			},
			coordinates: {
				latitude: loc[5],
				longitude: loc[6]
			}
		});
	});
	const string = JSON.stringify(result);
	redis.set(keys.jhu, string);
	console.log(`Updated JHU CSSE: ${result.length} locations`);
};

/**
 * Sets redis store full of today's JHU data scraped from their hosted CSV
 * @param {string} 	keys 	JHU data redis key
 * @param {Object} 	redis 	Redis instance
 */
const jhudataV2 = async (keys, redis) => {
	const response = await getData();

	const parsed = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(response.data);

	const result = [];
	parsed.splice(1).forEach((loc) => {
		result.push({
			country: loc[3],
			province: loc[2] || null,
			county: loc[1] || null,
			updatedAt: loc[4],
			stats: {
				confirmed: parseInt(loc[7]),
				deaths: parseInt(loc[8]),
				recovered: parseInt(loc[9])
			},
			coordinates: {
				latitude: loc[5],
				longitude: loc[6]
			}
		});
	});
	const string = JSON.stringify(result);
	redis.set(keys.jhu_v2, string);
	console.log(`Updated JHU CSSE: ${result.length} locations`);
};

/**
 * Returns JHU data with US states summed over counties
 * @param 	{Object} 	data 	All JHU data retrieved from redis store
 * @returns {Array} 			All data objects from JHU set for today with states summed over counties
 */
const generalizedJhudataV2 = (data) => {
	const result = [];
	const statesResult = {};

	data.forEach((loc) => {
		const defaultData = {
			country: loc.country,
			province: loc.province || null,
			updatedAt: loc.updatedAt,
			stats: {
				confirmed: loc.stats.confirmed,
				deaths: loc.stats.deaths,
				recovered: loc.stats.recovered
			},
			coordinates: {
				latitude: loc.coordinates.latitude,
				longitude: loc.coordinates.longitude
			}
		};
		// city exists only for US entries
		if (loc.county !== null) {
			if (statesResult[loc.province]) {
				// sum
				statesResult[loc.province].stats.confirmed += loc.stats.confirmed;
				statesResult[loc.province].stats.deaths += loc.stats.deaths;
				statesResult[loc.province].stats.recovered += loc.stats.recovered;
			} else { statesResult[loc.province] = defaultData; }
		} else {
			result.push(defaultData);
		}
	});
	Object.keys(statesResult).map((state) => result.push(statesResult[state]));
	return result;
};

/**
 * Filters JHU data to all counties or specific county names if specified
 * @param 	{Object} 	data	All JHU data retrieved from redis store
 * @param 	{string} 	county	Name of a county in the USA
 * @returns {Array}				All data from today with county names the same as input, or all county data if no county param
 */
const getCountyJhuDataV2 = (data, county = null) =>
	county ? data.filter((loc) => loc.county !== null && loc.county.toLowerCase() === county)
		: data.filter((loc) => loc.county !== null);

module.exports = {
	jhudata,
	jhudataV2,
	generalizedJhudataV2,
	getCountyJhuDataV2
};
