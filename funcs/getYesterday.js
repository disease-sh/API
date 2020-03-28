const axios = require('axios');
const cheerio = require('cheerio');
const countryUtils = require('../utils/country_utils');

const getYesterday = async (keys, redis) => {
	let response;
	try {
		response = await axios.get('https://www.worldometers.info/coronavirus/#nav-yesterday');
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
	const countriesTable = html('table#main_table_countries_yesterday');
	const countriesTableCells = countriesTable
		.children('tbody')
		.children('tr')
		.children('td');
	// NOTE: this will change when table format change in website
	const totalColumns = 10;
	const countryColIndex = 0;
	const casesColIndex = 1;
	const yesterdaysCasesColIndex = 2;
	const deathsColIndex = 3;
	const yesterdaysDeathsColIndex = 4;
	const curedColIndex = 5;
	const activeColIndex = 6;
	const criticalColIndex = 7;
	const casesPerOneMillionColIndex = 8;
	const deathsPerOneMillionColIndex = 9;
	// minus totalColumns to skip last row, which is total
	for (let i = 0; i < countriesTableCells.length - totalColumns; i += 1) {
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
			country = country.trim();
			result.push({ country, countryInfo: countryUtils.getCountryData(country) });
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
		if (i % totalColumns === yesterdaysCasesColIndex) {
			const cases = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].yesterdaysCases = parseInt(
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
		// get yesterdays deaths
		if (i % totalColumns === yesterdaysDeathsColIndex) {
			const deaths = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].yesterdaysDeaths = parseInt(
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
			result[result.length - 1].casesPerOneMillion = parseFloat(casesPerOneMillion);
		}

		// get total deaths per one million population
		if (i % totalColumns === deathsPerOneMillionColIndex) {
			const deathsPerOneMillion = cell.children.length !== 0 ? cell.children[0].data : '';
			result[result.length - 1].deathsPerOneMillion = parseFloat(deathsPerOneMillion);
		}
	}

	const string = JSON.stringify(result);
	redis.set(keys.yesterday, string);
	console.log(`Updated yesterdays statistics: ${result.length}`);
};

module.exports = getYesterday;
