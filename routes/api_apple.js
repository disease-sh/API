// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/country_utils');
const { appleData } = require('../utils/apple_cache');

router.get('/v2/apple/countries', async (req, res) => {
	const data = appleData();
	res.send(Object.keys(data));
});

// router.get('/v2/apple/countries/:country', async (req, res) => {
// 	const { country: queryCountry } = req.params;
// 	const data = appleData();
// 	if (queryCountry) {
// 		const countryArr = queryCountry.trim().split(/,[\s+?]/);
// 		const subregions = countryArr.map((countryName) => {
// 			const standardizedCountryName = countryUtils.getCountryData(countryName).country || countryName;
// 			return { country: standardizedCountryName, data: data[standardizedCountryName] || { message: 'Country not found or no data found for county' } };
// 		});
// 		res.send(subregions);
// 	} else {
// 		res.status(404).send({ message: 'Country not found or no data found for county' });
// 	}
// });

router.get('/v2/apple/countries/:country', async (req, res) => {
	const { country: queryCountry } = req.params;
	const data = appleData();
	if (queryCountry) {
		const countryArr = queryCountry.trim().split(/,[\s+?]/);
		const countryData = countryArr.map((countryName) => {
			const standardizedCountryName = countryUtils.getCountryData(countryName).country || countryName;
			return { country: standardizedCountryName, data: (data[standardizedCountryName] && data[standardizedCountryName].data) || { message: 'Country not found or no data found for county' } };
		});
		res.send(countryData);
	} else {
		res.status(404).send({ message: 'Country not found or no data found for county' });
	}
});

module.exports = router;
