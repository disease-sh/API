const { scraper: { executeScraper, executeScraperNYTData, excecuteScraperAppleData, excecuteScraperGov }, redis } = require('../routes/instances');
const logger = require('../utils/logger');

// eslint-disable-next-line
before(async () => {
	await redis.flushall();
	logger.info('Finished flushing all data from redis.');

	await executeScraper();
	await executeScraperNYTData();
	await excecuteScraperAppleData();
	await excecuteScraperGov();
	logger.info('Scraping finished.');
});

/**
 * Checks that error doesn't exist, response exists, status code, and object type
 * @param {Object} 	err 			req err
 * @param {Object} 	res 			req response
 * @param {string} 	expectedType 	type of body that we expect in JSON body
 */
const testBasicProperties = (err, res, expectedType) => {
	should.not.exist(err);
	should.exist(res);
	res.should.have.status(200);
	res.body.should.be.a(expectedType);
}

module.exports = {
	testBasicProperties
};