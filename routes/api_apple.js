// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/country_utils');
const { appleData } = require('../utils/apple_cache');

router.get('/v2/apple/countries/:country?', async (req, res) => {
	const { country: queryCountry } = req.params;
	const data = appleData();
	if (queryCountry) {
		const countryName = queryCountry.trim();
		const standardizedCountryName = countryUtils.getCountryData(countryName).country || countryName;
		if (data[standardizedCountryName] && data[standardizedCountryName].subregions) {
			res.send({ country: standardizedCountryName, subregions: data[standardizedCountryName].subregions });
		} else {
			res.status(404).send({ message: `Country '${standardizedCountryName}' not found or no data found for county` });
		}
	} else {
		res.send(Object.keys(data));
	}
});

router.get('/v2/apple/countries/:country/:subregions', async (req, res) => {
	const { country: queryCountry, subregions: querySubregions } = req.params;
	const data = appleData();
	if (queryCountry && querySubregions) {
		const countryName = queryCountry.trim();
		const standardizedCountryName = countryUtils.getCountryData(countryName).country || countryName;
		const countryData = data[standardizedCountryName];
		const subregions = querySubregions.trim().split(/,[\s+?]/).map((subregion) => subregion.toLowerCase());
		const subregiondata = subregions.map((subregion) => {
			const notFoundMessage = `Subregion '${subregion}' not found for '${standardizedCountryName}'`;
			if (countryData && countryData.data) {
				const subregionData = countryData.data.filter((element) => element.subregion_and_city.toLowerCase() === subregion);
				return {
					subregion: subregion,
					data: subregionData.length > 0 ? subregionData : { message: notFoundMessage }
				};
			} else {
				return { subregion: subregion, message: notFoundMessage };
			}
		});
		res.send(subregiondata);
	} else {
		res.status(404).send({ message: 'Subregion not found or no data found for county' });
	}
});

module.exports = router;
