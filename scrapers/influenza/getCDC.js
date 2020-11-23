const axios = require('axios');
const cheerio = require('cheerio');
const logger = require('../../utils/logger');
const { getCurrentWeek } = require('../../utils/dateTimeUtils');

const weekNumber = getCurrentWeek() - 2;
const ILINetURL = `https://www.cdc.gov/flu/weekly/weeklyarchives2019-2020/data/senAllregt${weekNumber}.html`;
const USPHLURL = `https://www.cdc.gov/flu/weekly/weeklyarchives2019-2020/data/whoAllregt_phl${weekNumber}.html`;
const USCLURL = `https://www.cdc.gov/flu/weekly/weeklyarchives2019-2020/data/whoAllregt_cl${weekNumber}.html`;

const ILINetColumns = ['week', 'age 0-4', 'age 5-24', 'age 25-49', 'age 50-64', 'age 64+', 'totalILI', 'totalPatients', 'percentUnweightedILI', 'percentWeightedILI'];
const USPHLColumns = ['week', 'A(H3N2v)', 'A(H1N1)', 'A(H3)', 'A(unable to sub-type)', 'A(Subtyping not performed)', 'B', 'BVIC', 'BYAM', 'totalTests'];
const USCLColumns = ['week', 'totalA', 'totalB', 'percentPositiveA', 'percentPositiveB', 'totalTests', 'percentPositive'];

/**
 * Return object reflecting a row of data from a CDC table
 * @param 	{Object} 	row		    The row to extract data from
 * @param 	{Array} 	columns	    Respective columns for row being passed in
 * @returns {Object}				Influenza data for a week with entries for each column in @param columns
 */
const mapRows = (row, columns) => {
	const week = { };
	cheerio(row).children('td').each((index, cell) => {
		cell = cheerio.load(cell);
		const cellContents = cell.text();
		switch (index) {
			case 0: {
				week[columns[index]] = `${cell.text().slice(0, 4)} - ${cell.text().slice(4)}/52`;
				break;
			}
			default: {
				if (cellContents.includes('.')) week[columns[index]] = parseFloat(cellContents);
				else week[columns[index]] = parseInt(cell.text());
			}
		}
	});
	return week;
};

/**
 * Scrapes data from table on CDC website and stores data in redis
 * @param {string} url 	CDC URL to scrape
 * @param {Object} columns Corresponding columns for table
 * @param {string} key Redis key to store data at
 * @param {Object} redis Redis instance
 */
const scrapeTable = async (url, columns, key, redis) => {
	try {
		const html = cheerio.load((await axios.get(url)).data);
		const tableData = html(`table`).children('tr').slice(1).map((_, row) => mapRows(row, columns)).get();
		const data = {
			updated: Date.now(),
			source: 'www.cdc.gov/flu',
			data: tableData
		};
		redis.set(key, JSON.stringify(data));
		logger.info(`Updated ${key} data: ${tableData.length} weeks`);
	} catch (err) {
		logger.err(`Error: Requesting CDC:${key} Data failed!`, err);
	}
};

const getCDCDInfluenzaData = async (keys, redis) => {
	await scrapeTable(ILINetURL, ILINetColumns, keys.influenza_ILINET, redis);
	await scrapeTable(USPHLURL, USPHLColumns, keys.influenza_USPHL, redis);
	await scrapeTable(USCLURL, USCLColumns, keys.influenza_USCL, redis);
};

module.exports = getCDCDInfluenzaData;
