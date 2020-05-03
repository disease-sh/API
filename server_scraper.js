const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData }, config } = require('./routes/instances');

executeScraper();
executeScraperNYTData();
excecuteScraperAppleData();

// Update Worldometer and Johns Hopkins data every 10 minutes
setInterval(executeScraper, config.interval);
// Update NYT data every hour
setInterval(executeScraperNYTData, config.nyt_interval);
// Update Apple data every  24 hours
setInterval(excecuteScraperAppleData, config.apple_interval);
