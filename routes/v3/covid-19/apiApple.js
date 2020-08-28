// eslint-disable-next-line new-cap
const router = require('express').Router();
const nameUtils = require('../../../utils/nameUtils');
const { splitQuery } = require('../../../utils/stringUtils');
const appleData = require('../../../utils/apiAppleHelper');
const { redis, keys } = require('../../../routes/instances');

router.get('/v3/covid-19/apple/countries/:country?', async (req, res) => {
	const { country: countryName } = req.params;
	const data = await appleData(redis, keys);
	if (countryName) {
		const standardizedCountryName = nameUtils.getCountryData(countryName.trim()).country || countryName.trim();
		if (data[standardizedCountryName] && data[standardizedCountryName].subregions) {
			res.send({ country: standardizedCountryName, subregions: data[standardizedCountryName].subregions });
		} else {
			res.status(404).send({ message: `Country '${standardizedCountryName}' not found or no data found for county` });
		}
	} else {
		res.send(Object.keys(data));
	}
});

router.get('/v3/covid-19/apple/countries/:country/:subregions', async (req, res) => {
	const { country: countryName, subregions: querySubregions } = req.params;
	if (countryName && querySubregions) {
		const standardizedCountryName = nameUtils.getCountryData(countryName.trim()).country || countryName.trim();
		const appledata = await appleData(redis, keys);
		const countryData = appledata[standardizedCountryName];
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
