const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../../utils/logger');

/* eslint quote-props: ["error", "consistent"] */
const mapStateToCve = {
	'nacional': '000',
	'aguascalientes': '01',
	'baja california': '02',
	'baja california Sur': '03',
	'campeche': '04',
	'coahuila': '05',
	'colima': '06',
	'chiapas': '07',
	'chihuahua': '08',
	'ciudad de mexico': '09',
	'durango': '10',
	'estado de mexico': '15',
	'guanajuato': '11',
	'guerrero': '12',
	'hidalgo': '13',
	'jalisco': '14',
	'michoacan': '16',
	'morelos': '17',
	'nayarit': '18',
	'nuevo leon': '19',
	'oaxaca': '20',
	'puebla': '21',
	'queretaro': '22',
	'quintana roo': '23',
	'san luis potosi': '24',
	'sinaloa': '25',
	'sonora': '26',
	'tabasco': '27',
	'tamaulipas': '28',
	'tlaxcala': '29',
	'veracruz': '30',
	'yucatan': '31',
	'zacatecas': '32'
};

// const mapRows = (_, row) => {
// 	const province = { updated: Date.now() };
// 	cheerio(row).children('td').each((index, cell) => {
// 		cell = cheerio.load(cell);
// 		switch (index) {
// 			case 0: {
// 				province[columns[index]] = cell.text() === 'Canada' ? 'Total' : cell.text();
// 				break;
// 			}
// 			default: {
// 				province[columns[index]] = parseInt(cell.text().replace(/,/g, '')) || null;
// 			}
// 		}
// 	});
// 	return province;
// };

const mexicoData = async () => {
	try {
		const html = cheerio.load((await axios.get('https://coronavirus.gob.mx/datos/Overview/overView.php')).data);
		return html(`table#dataTable`).children('tbody:first-of-type').children('tr');
	} catch (err) {
		logger.err('Error: Requesting Mexico Gov Data failed!', err);
		return null;
	}
};

mexicoData();

module.exports = mexicoData;
