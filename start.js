const Redis = require('ioredis');
const CronJob = require('cron').CronJob;
const logger = require('./utils/logger');
const { keys, scraper } = require('./routes/instances');

let config = {
    "interval": "*/10 * * * *", // Every 10th min
    "nyt_interval": "0 * * * *" // Every one hour
}

const setConfig = (passedConfig) => {
    config = {...config, ...passedConfig};
}

const execAll = async (redis) => {
    await Promise.all([
        scraper.getWorldometerPage(keys, redis),
        scraper.getStates(keys, redis),
        scraper.jhuLocations.jhudataV2(keys, redis),
        scraper.historical.historicalV2(keys, redis),
        scraper.historical.getHistoricalUSADataV2(keys, redis)
    ]);
    logger.info('Finished scraping!');
};

const execNyt = (redis) => scraper.nytData(keys, redis);

const startFetch = () => {
    console.log(config);
    if (!!config.redis && config.redis.host && config.redis.port && config.redis.password != null) {
        // All redis related data is present. Its good to go.
    } else {
        // It looks like redis config data is missing, so do not process this
        throw "Redis config should include host, port and password";
    }

    const redis = new Redis(config.redis.host, {
        password: config.redis.password,
        port: config.redis.port
    });
    execAll(redis).then(() => {});
    execNyt(redis).then(() => {});

    // Update Worldometer and Johns Hopkins data every 10 minutes
    new CronJob(config.interval, () => {
        logger.info("*** Worldometer JHU Tick ***");
        execAll(redis).then(() => {});
    }).start();
    // Update NYT data every hour
    new CronJob(config.nyt_interval, () => {
        logger.info("*** NYT Tick ***");
        execNyt(redis).then(() => {});
    }).start();
}

module.exports = {
    setConfig,
    startFetch
}