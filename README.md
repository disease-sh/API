# Scraper of COVID19 

## This is a fork
This repo is a fork. Checkout [NovelCovid API](https://github.com/NovelCOVID/API) for the official documentation.

### PS
**This library runs along side of your NodeJS project. This library doesn't serve API's, it only scrapes and saves the data to redis.**
_Useful if you want to get the data from Redis directly_

## Installation 

```shell script
yarn add novelcovid-scraper
or
npm install novelcovid-scraper
```

## Getting Started

#### Import novelcovid-scraper
```javascript
const { setConfig, startFetch } = require('novelcovid-scraper');
```

#### Set Config
```javascript
setConfig({
  interval: '*/10 * * * *',  // Optional: Default (*/10 * * * *) Every 10 mins 
  nyt_interval: '0 * * * *', // Optional: Default (0 * * * *) Every hour
  redis: {
    host: "localhost",       // Mandatory
    password: "",            // Mandatory
    port: "6379"             // Mandatory
  } 
});
```
1. ```interval``` denotes the frequency of fetching data from Worldometer and JHU
2. ```nyt_interval``` denotes the frequency of fetching data from nytimes
3. Redis parameters are mandatory. You can install redis by checking this link https://redis.io/topics/quickstart
4. [Cron](https://www.npmjs.com/package/cron) library user for scheduler. You can generate your own cron scheduler [here](https://crontab.guru/)

#### Start server
```javascript
startFetch();
```

#### Data dumped to redis
Based on the scheduler time the data is scraped and updated to redis. You can find the redis keys [here](https://github.com/COVID19-SARS-CoV-2/covid-19-scraper/blob/master/config.keys.json)

Datas are scraped from 
* https://www.worldometers.info/coronavirus/

* https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series

* https://github.com/nytimes/covid-19-data
