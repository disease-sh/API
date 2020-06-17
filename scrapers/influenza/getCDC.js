const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');
const { getCurrentWeek } = require('../../utils/dateTimeUtils');

const ILINetColumns = ['week', 'age 0-4', 'age 5-24', 'age 25-49', 'age 50-64', 'age 64+', 'totalILI', 'totalPatients', 'percentUnweightedILI', '% Weighted ILI'];
const USPHLColumns = ['week', 'A(H3N2v)', 'A(H1N1)', 'A(H3)', 'A(unable to sub-type)', 'A(Subtyping not performed)', 'B', 'BVIC', 'totalTests'];
const USCLColumns = ['week', 'totalA', 'totalB', 'percentPositiveA', 'percentPositiveB', 'totalTests', 'percentPositive'];

const weekNumber = getCurrentWeek();
console.log(weekNumber);

/**
 * Return object reflecting a row of data from a CDC table
 * @param 	{number} 	_ 		    Index getting passed when using .map()
 * @param 	{Object} 	row		    The row to extract data from
 * @param 	{Array} 	columns	    Respective columns for row being passed in
 * @returns {Object}				Influenza data for a week with entries for each column in @param columns
 */
const mapRows = (_, row, columns) => {
	const province = { };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		switch (index) {
			case 0: {
				province[columns[index]] = cell.text() === 'Grand Total' ? 'Total' : cell.text();
				break;
			}
			case 3: {
				break;
			}
			default: {
				province[columns[index]] = parseInt(cell.text().replace(/,/g, '')) || null;
			}
		}
	});
	return province;
};