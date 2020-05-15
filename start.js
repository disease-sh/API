const Redis = require('ioredis');
const CronJob = require('cron').CronJob;
const logger = require('./utils/logger');

let config = {
    interval: "*/10 * * * *", // Every 10th min
    nyt_interval: "0 * * * *", // Every one hour
    flagsBase: 'https://corona.lmao.ninja/assets/img/flags/',
    redis: {
        host: "localhost",
        password: "",
        port: "6379"
    }
}

const getConfig = () => {
    return config;
};

const setConfig = (passedConfig) => {
    config = {...config, ...passedConfig};
}

const execAll = async (redis, keys, scraper) => {
    await Promise.all([
        scraper.getWorldometerPage(keys, redis),
        scraper.getStates(keys, redis),
        scraper.jhuLocations.jhudataV2(keys, redis),
        scraper.historical.historicalV2(keys, redis),
        scraper.historical.getHistoricalUSADataV2(keys, redis)
    ]);
    logger.info('Finished scraping!');
};

const execNyt = (redis, keys, scraper) => scraper.nytData(keys, redis);

const startFetch = () => {
    const { redis, keys, scraper } = require('./routes/instances');
    logger.info('Config File!');
    console.log(config);
    if (!!config.redis && config.redis.host && config.redis.port && config.redis.password != null) {
        // All redis related data is present. Its good to go.
    } else {
        // It looks like redis config data is missing, so do not process this
        throw "Redis config should include host, port and password";
    }

    execAll(redis, keys, scraper).then(() => {});
    execNyt(redis, keys, scraper).then(() => {});

    // Update Worldometer and Johns Hopkins data every 10 minutes
    new CronJob(config.interval, () => {
        logger.info("*** Worldometer JHU Tick ***");
        execAll(redis, keys, scraper).then(() => {});
    }).start();
    // Update NYT data every hour
    new CronJob(config.nyt_interval, () => {
        logger.info("*** NYT Tick ***");
        execNyt(redis, keys, scraper).then(() => {});
    }).start();
}

module.exports = {
    setConfig,
    startFetch,
    getConfig
}