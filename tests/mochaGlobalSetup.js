const { scraper: { executeScrapeJob }, redis } = require('../routes/instances');

// eslint-disable-next-line
before(async () => {
	await redis.flushall();
	console.log('Finished flushing all data from redis.');

	await executeScrapeJob();
	console.log('Scraping finished.');
});
