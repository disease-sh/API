const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');

const getcountries = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus/');
		if (response.status !== 200) {
			console.log('Error', response.status);
		}
	} catch (err) {
		return null;
	}
	// to store parsed data
	const result = [];
	// get HTML and parse death rates
	const html = cheerio.load(response.data);
	const countriesTable = html('table#main_table_countries_today');
	const countriesTableCells = countriesTable
		.children('tbody')
		.children('tr')
		.children('td');
	// NOTE: this will change when table format change in website
	const totalColumns = 10;
	const countryColIndex = 0;
	const casesColIndex = 1;
	const todayCasesColIndex = 2;
	const deathsColIndex = 3;
	const todayDeathsColIndex = 4;
	const curedColIndex = 5;
	const activeColIndex = 6;
	const criticalColIndex = 7;
	const casesPerOneMillionColIndex = 8;
	const deathsPerOneMillionColIndex = 9;
	// minus totalColumns to skip last row, which is total
	for (let i = 0; i < countriesTableCells.length - totalColumns; i++) {
		const cell = countriesTableCells[i];
		// get country
		if (i % totalColumns === countryColIndex) {
			let country = cell.children[0].data
				|| cell.children[0].children[0].data
				// country name with link has another level
				|| cell.children[0].children[0].children[0].data
				|| cell.children[0].children[0].children[0].children[0].data
				|| '';

			country = country.trim();
			if (country.length === 0) {
				// parse with hyperlink
				country = cell.children[0].next.children[0].data || '';
			}
			const countryData = countryUtils.getCountryData(country.trim());
			result.push({
				country: countryData.country || country.trim(),
				countryInfo: {
					_id: countryData._id,
					lat: countryData.lat,
					long: countryData.long,
					flag: countryData.flag,
					iso3: countryData.iso3,
					iso2: countryData.iso2,
				},
			});
		}
		// get cases
		if (i % totalColumns === casesColIndex) {
			const cases = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].cases = parseInt(
				cases.trim().replace(/,/g, '') || '0',
				10,
			);
		}
		// get today cases
		if (i % totalColumns === todayCasesColIndex) {
			const cases = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].todayCases = parseInt(
				cases.trim().replace(/,/g, '') || '0',
				10,
			);
		}
		// get deaths
		if (i % totalColumns === deathsColIndex) {
			const deaths = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].deaths = parseInt(
				deaths.trim().replace(/,/g, '') || '0',
				10,
			);
		}
		// get today deaths
		if (i % totalColumns === todayDeathsColIndex) {
			const deaths = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].todayDeaths = parseInt(
				deaths.trim().replace(/,/g, '') || '0',
				10,
			);
		}
		// get cured
		if (i % totalColumns === curedColIndex) {
			const cured = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].recovered = parseInt(
				cured.trim().replace(/,/g, '') || 0,
				10,
			);
		}
		// get active
		if (i % totalColumns === activeColIndex) {
			const cured = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].active = parseInt(
				cured.trim().replace(/,/g, '') || 0,
				10,
			);
		}
		// get critical
		if (i % totalColumns === criticalColIndex) {
			const critical = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].critical = parseInt(
				critical.trim().replace(/,/g, '') || '0',
				10,
			);
		}
		// get total cases per one million population
		if (i % totalColumns === casesPerOneMillionColIndex) {
			const casesPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].casesPerOneMillion = parseFloat(
				casesPerOneMillion.trim().replace(/,/g, '') || '0',
			);
		}

		// get total deaths per one million population
		if (i % totalColumns === deathsPerOneMillionColIndex) {
			const deathsPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].deathsPerOneMillion = parseFloat(
				deathsPerOneMillion.trim().replace(/,/g, '') || '0',
			);
		}
	}

	const string = JSON.stringify(result);
	redis.set(keys.countries, string);
	console.log(`Updated countries: ${result.length} countries`);
};

module.exports = getcountries;
