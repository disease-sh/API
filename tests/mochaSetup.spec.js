const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperInfluenza, excecuteScraperVaccineCoverage },
	redis } = require('../routes/instances');
const logger = require('../utils/logger');

const testFileArgs = process.argv.splice(5);
const argValues = new Set(testFileArgs.map(fl => fl.substring(fl.indexOf('_') + 1, fl.indexOf('.'))));
const mapArgToScraper = {
	worldometers: executeScraper,
	jhucsse: executeScraper,
	historical: executeScraper,
	nyt: executeScraperNYTData,
	apple: excecuteScraperAppleData,
	gov: excecuteScraperGov,
	influenza: excecuteScraperInfluenza,
	vaccine: excecuteScraperVaccineCoverage
};

// eslint-disable-next-line
before(async () => {
	await redis.flushall();
	logger.info('Finished flushing all data from redis.');
	if (argValues) {
		await Promise.all(Array.from(argValues).map(async (argValue) => {
			if (mapArgToScraper[argValue]) await mapArgToScraper[argValue]();
		}));
	} else {
		await executeScraper();
		await executeScraperNYTData();
		await excecuteScraperAppleData();
		await excecuteScraperGov();
		await excecuteScraperInfluenza();
		await excecuteScraperVaccineCoverage();
		logger.info('Scraping all data finished.');
	}
});
