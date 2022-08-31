const {
	scraper: {
		executeScraper,
		executeScraperNYTData,
		excecuteScraperAppleData,
		excecuteScraperGov,
		excecuteScraperVaccineCoverage,
		excecuteScraperVaccineStateCoverage,
		executeScraperVariants
	},
	redis
} = require('../routes/instances');
const logger = require('../utils/logger');

const [arg] = process.argv[5].split('/').slice(-1);
const argValue = arg.substring(arg.indexOf('_') + 1, arg.indexOf('.'));
console.log(argValue);
const mapArgToScraper = {
	worldometers: executeScraper,
	jhucsse: executeScraper,
	historical: executeScraper,
	nyt: executeScraperNYTData,
	apple: excecuteScraperAppleData,
	gov: excecuteScraperGov,
	vaccine: excecuteScraperVaccineCoverage,
	vaccinestate: excecuteScraperVaccineStateCoverage,
	variants: executeScraperVariants
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
		await excecuteScraperVaccineCoverage();
		await excecuteScraperVaccineStateCoverage();
		await executeScraperVariants();
		logger.info('Scraping all data finished.');
	}
});
