const { scraper: { executeScraper, executeScraperNYTData }, redis } = require('../routes/instances');

// eslint-disable-next-line
before(async () => {
	await redis.flushall();
	console.log('Finished flushing all data from redis.');

	await executeScraper();
	await executeScraperNYTData();
	console.log('Scraping finished.');
});
