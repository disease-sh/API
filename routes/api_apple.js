// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../utils/country_utils');
const { splitQuery } = require('../utils/string_utils');
const { appleData } = require('../utils/apple_cache');

router.get('/v2/apple/countries/:country?', async (req, res) => {
	let { country: countryName } = req.params;
	const data = appleData();
	if (countryName) {
		const standardizedCountryName = countryUtils.getCountryData(countryName.trim()).country || countryName.trim();
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
	const { country: countryName, subregions: querySubregions } = req.params;
	if (countryName && querySubregions) {
		const standardizedCountryName = countryUtils.getCountryData(countryName.trim()).country || countryName.trim();
		const countryData = appleData()[standardizedCountryName];
		const subregions = splitQuery(querySubregions).map((subregion) => subregion.trim().toLowerCase());
		const subregiondata = subregions.map((subregion) => {
			const data = { subregion, message: `Subregion '${subregion}' not found for '${standardizedCountryName}'` };
			const subdata = countryData && countryData.data && countryData.data.filter((element) => element.subregion_and_city.toLowerCase() === subregion);
			if (subdata && subdata.length > 0) {
				delete data.message;
				data.data = subdata;
			}
			return data;
		});
		res.send(subregiondata.length > 1 ? subregiondata : subregiondata[0]);
	} else {
		res.status(404).send({ message: 'Subregion not found or no data found for county' });
	}
});

module.exports = router;
