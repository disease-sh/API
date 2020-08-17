const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov, excecuteScraperVaccine, excecuteScraperInfluenza }, config } = require('./routes/instances');

executeScraper();
executeScraperNYTData();
excecuteScraperAppleData();
excecuteScraperGov();
excecuteScraperInfluenza();
excecuteScraperVaccine();

// Update Worldometer and Johns Hopkins data every 10 minutes
setInterval(executeScraper, config.worldometersInterval);
// Update NYT data every hour
setInterval(executeScraperNYTData, config.nytInterval);
// Update Apple data every  24 hours
setInterval(excecuteScraperAppleData, config.appleInterval);
// Update Government data every  24 hours
setInterval(excecuteScraperGov, config.govInterval);
// Update vaccine data every  24 hours
setInterval(excecuteScraperVaccine, config.vaccineInterval);
// Update CDC Influenza data every  24 hours
setInterval(excecuteScraperInfluenza, config.cdcInterval);
