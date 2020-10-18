const axios = require('axios');
const logger = require('../../../utils/logger');

const indonesiaData = async () => {
	try {
		const data = await axios('https://data.covid19.go.id/public/api/data.json');
		const update = await axios('https://data.covid19.go.id/public/api/update.json');
		const prov = await axios('https://data.covid19.go.id/public/api/prov.json');
		return {
			data: data.data,
			update: update.data,
			prov: prov.data
		};
	} catch (err) {
		logger.err('Error: Requesting Indonesia Gov Data failed!', err);
		return null;
	}
};

module.exports = indonesiaData;
