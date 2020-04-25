const logger = require('../utils/logger');
const { scraper: { executeScraper, executeScraperNYTData }, redis } = require('../routes/instances');

// eslint-disable-next-line
before(async () => {
	await redis.flushall();
	logger.msg('Finished flushing all data from redis.');

	await executeScraper();
	await executeScraperNYTData();
	logger.msg('Scraping finished.');
});
