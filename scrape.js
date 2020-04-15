const { config, scraper: { executeScrapeJob } } = require('./routes/instances');

const logWithDate = (message) => console.log(`[${new Date().toISOString()}]: ${message}`);

logWithDate('Starting initial scrape job...');
executeScrapeJob().then(() => logWithDate('Initial scrape job finished.'));
setInterval(() => {
	logWithDate('Scrape job waking up and executing...');
	executeScrapeJob().then(() => logWithDate('Finished scrape job.'));
}, config.interval);
