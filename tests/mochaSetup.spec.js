const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperInfluenza, excecuteScraperVaccineCoverage },
	redis } = require('../routes/instances');
const logger = require('../utils/logger');

const [arg] = process.argv[5].split('/').slice(-1);
const argValue = arg.substring(arg.indexOf('_') + 1, arg.indexOf('.'));

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
	if (argValue in mapArgToScraper) {
		await mapArgToScraper[argValue]();
	} else {
		await executeScraper();
		await executeScraperNYTData();
		await excecuteScraperAppleData();
		await excecuteScraperGov();
		await excecuteScraperInfluenza();
		logger.info('Scraping all data finished.');
	}
});
