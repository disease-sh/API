const axios = require('axios');
const csv = require('csvtojson');

// eslint-disable-next-line max-len
const base = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';

const jhudata = async (keys, redis) => {
	let response;
	const date = new Date();
	try {
		response = await axios.get(
			`${base}0${date.getMonth()
				+ 1}-${date.getDate()}-${date.getFullYear()}.csv`
		);
		console.log(
			`USING 0${date.getMonth() + 1}-${date.getDate()
				- 1}-${date.getFullYear()}.csv CSSEGISandData`
		);
	} catch (err) {
		response = await axios.get(
			`${base}0${date.getMonth() + 1}-${date.getDate()
				- 1}-${date.getFullYear()}.csv`
		);
		console.log(
			`USING 0${date.getMonth() + 1}-${date.getDate()
				- 1}-${date.getFullYear()}.csv CSSEGISandData`
		);
	}

	const parsed = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(response.data);

	// to store parsed data
	const result = [];

	parsed.splice(1).forEach((loc) => {
		result.push({
			country: loc[3],
			province: loc[2] === '' ? null : loc[2],
			city: loc[1] === '' ? null : loc[1],
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

const jhudataV2 = async (keys, redis) => {
	let response;
	const date = new Date();
	try {
		response = await axios.get(
			`${base}0${date.getMonth()
				+ 1}-${date.getDate()}-${date.getFullYear()}.csv`
		);
		console.log(
			`USING 0${date.getMonth() + 1}-${date.getDate()
				- 1}-${date.getFullYear()}.csv CSSEGISandData`
		);
	} catch (err) {
		response = await axios.get(
			`${base}0${date.getMonth() + 1}-${date.getDate()
				- 1}-${date.getFullYear()}.csv`
		);
		console.log(
			`USING 0${date.getMonth() + 1}-${date.getDate()
				- 1}-${date.getFullYear()}.csv CSSEGISandData`
		);
	}

	const parsed = await csv({
		noheader: true,
		output: 'csv'
	}).fromString(response.data);

	const result = [];
	parsed.splice(1).forEach((loc) => {
		result.push({
			country: loc[3],
			province: loc[2] === '' ? null : loc[2],
			county: loc[1] === '' ? null : loc[1],
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

const generalizedJhudataV2 = (data) => {
	const result = [];
	const statesResult = {};

	data.forEach((loc) => {
		const defaultData = {
			country: loc.country,
			province: loc.province === '' ? null : loc.province,
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

module.exports = {
	jhudata,
	jhudataV2,
	generalizedJhudataV2
};
