const axios = require('axios');
const csv = require('csvtojson');
const logger = require('../../utils/logger');

/**
 * Scrapes Swiss government site and fills array of data from table
 */
const switzerlandData = async () => {
	try {
		const data = await csv().fromString((await axios.get('https://raw.githubusercontent.com/openZH/covid_19/master/COVID19_Fallzahlen_CH_total_v2.csv')).data);
		return data.map(row => {
			const transformed = {
				updated: Date.parse(`${row.date} ${row.time}`.trim()),
				canton: row.abbreviation_canton_and_fl,
				tests: row.ncumul_tested ? parseInt(row.ncumul_tested) : 'N/A',
				cases: row.ncumul_conf ? parseInt(row.ncumul_conf) : 'N/A',
				newHospitalizations: row.new_hosp ? parseInt(row.new_hosp) : 'N/A',
				hospitalizations: row.current_hosp ? parseInt(row.current_hosp) : 'N/A',
				intensiveCare: row.current_icu ? parseInt(row.current_icu) : 'N/A',
				critical: row.current_vent ? parseInt(row.current_vent) : 'N/A',
				recovered: row.ncumul_released ? parseInt(row.ncumul_released) : 'N/A',
				deaths: row.ncumul_deceased ? parseInt(row.ncumul_deceased) : 'N/A',
				source: row.source
			};
			delete transformed.date;
			delete transformed.time;
			return transformed;
		});
	} catch (err) {
		logger.err('Error: Requesting Swiss Gov Data failed!', err);
		return null;
	}
};

module.exports = switzerlandData;
