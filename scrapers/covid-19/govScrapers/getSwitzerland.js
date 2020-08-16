const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../../../utils/logger');

/**
 * Scrapes Swiss government site and fills array of data from table
 */
const switzerlandData = async () => {
	try {
		const data = await csv().fromString((await axios.get('https://raw.githubusercontent.com/openZH/covid_19/master/COVID19_Fallzahlen_CH_total_v2.csv')).data);
		return data.map(row => {
			const transformed = {
				date: Date.parse(`${row.date} ${row.time}`.trim()),
				updated: Date.now(),
				canton: row.abbreviation_canton_and_fl,
				tests: parseInt(row.ncumul_tested) || null,
				cases: parseInt(row.ncumul_conf) || null,
				newHospitalizations: parseInt(row.new_hosp) || null,
				hospitalizations: parseInt(row.current_hosp) || null,
				intensiveCare: parseInt(row.current_icu) || null,
				critical: parseInt(row.current_vent) || null,
				recovered: parseInt(row.ncumul_released) || null,
				deaths: parseInt(row.ncumul_deceased) || null,
				source: row.source
			};
			return transformed;
		});
	} catch (err) {
		logger.err('Error: Requesting Swiss Gov Data failed!', err);
		return null;
	}
};

module.exports = switzerlandData;
