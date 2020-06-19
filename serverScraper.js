const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperEbola, excecuteScraperInfluenza }, config } = require('./routes/instances');

executeScraper();
executeScraperNYTData();
excecuteScraperAppleData();
excecuteScraperGov();
excecuteScraperEbola();
excecuteScraperInfluenza();

// Update Worldometer and Johns Hopkins data every 10 minutes
setInterval(executeScraper, config.interval);
// Update NYT data every hour
setInterval(executeScraperNYTData, config.nyt_interval);
// Update Apple data every  24 hours
setInterval(excecuteScraperAppleData, config.apple_interval);
// Update Government data every  24 hours
setInterval(excecuteScraperGov, config.gov_interval);
// Update Ebola data every  24 hours
setInterval(excecuteScraperEbola, config.ebola_interval);
// Update CDC data every  24 hours
setInterval(excecuteScraperInfluenza, config.CDC_interval);
