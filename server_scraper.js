const { scraper: { executeScraper, executeScraperNYTData }, config } = require('./routes/instances');

executeScraper();
executeScraperNYTData();

// Update Worldometer and Johns Hopkins data every 10 minutes
setInterval(executeScraper, config.interval);
// Update NYT data every hour
setInterval(executeScraperNYTData, config.nyt_interval);
