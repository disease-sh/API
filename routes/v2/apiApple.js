// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryUtils = require('../../utils/countryUtils');
const { splitQuery } = require('../../utils/stringUtils');
const { appleData } = require('../../utils/appleCache');

router.get('/v2/apple/countries/:country?', async (req, res) => {
	const { country: countryName } = req.params;
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
		const subregions = splitQuery(querySubregions).map((subregion) => subregion.trim());
		const subregiondata = subregions.map((subregion) => {
			const data = { country: standardizedCountryName, message: `Subregion '${subregion}' not found for '${standardizedCountryName}'` };
			const subdata = countryData && countryData.data && countryData.data.filter((element) => element.subregion_and_city.toLowerCase() === subregion.toLowerCase());
			if (subdata && subdata.length > 0) {
				delete data.message;
				data.subregion = subdata[0].subregion_and_city;
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
