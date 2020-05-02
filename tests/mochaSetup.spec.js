const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData }, redis } = require('../routes/instances');

// eslint-disable-next-line
before(async () => {
	await redis.flushall();
	console.log('Finished flushing all data from redis.');

	await executeScraper();
	await executeScraperNYTData();
	await excecuteScraperAppleData();
	console.log('Scraping finished.');
});
