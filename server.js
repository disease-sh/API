var express = require('express');
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");
var cors = require('cors');
const config = require('./config.json');
const Redis = require('ioredis');
const scraper = require('./scraper');
const countryMap = require('./funcs/countryMap');

app.use(cors());

// create redis instance :O
const redis = new Redis(config.redis.host, {
  password: config.redis.password,
  port: config.redis.port
})

const keys = config.keys;

const execAll = () => {
    scraper.getCountries(keys, redis);
    scraper.getAll(keys, redis);
    scraper.getStates(keys, redis);
    scraper.jhuLocations.jhudata(keys, redis);
    scraper.jhuLocations.jhudata_v2(keys, redis);
    scraper.historical.historical(keys, redis);
    scraper.historical.historical_v2(keys, redis);
};
execAll()
setInterval(execAll, config.interval);

app.get("/", async function (request, response) {
  response.redirect('https://github.com/novelcovid/api');
});
var listener = app.listen(config.port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
app.get("/all/", async function (req, res) {
  let all = JSON.parse(await redis.get(keys.all))
  res.send(all);
});
app.get("/countries/", async function (req, res) {
  let sort = req.query.sort;
  let countries = JSON.parse(await redis.get(keys.countries))
  if(sort){
    countries = countries.sort((a, b) => (a[sort] > b[sort]) ? -1 : 1)
  }
  res.send(countries);
});
app.get("/states/", async function (req, res) {
  let states = JSON.parse(await redis.get(keys.states))
  res.send(states);
});

app.get("/jhucsse/", async function (req, res) {
  let data = JSON.parse(await redis.get(keys.jhu))
  res.send(data);
});

app.get("/historical/", async function (req, res) {
  let data = JSON.parse(await redis.get(keys.historical))
  res.send(data);
});

app.get("/historical/:country", async function (req, res) {
  let data = JSON.parse(await redis.get(keys.historical));
  const countryData = await scraper.historical.getHistoricalCountryData(data, req.params.country.toLowerCase(), redis, keys.states);
  res.send(countryData);
});

app.get("/countries/:country", async function (req, res) {
  let countries = JSON.parse(await redis.get(keys.countries))
  const standardizedCountryName = countryMap.standardizeCountryName(req.params.country.toLowerCase());
  let country = countries.find(e => {
    // see if strict was even a parameter
    if (req.query.strict) {
      return req.query.strict.toLowerCase() == 'true' ? e.country.toLowerCase() === standardizedCountryName : e.country.toLowerCase().includes(standardizedCountryName)
    }
    else {
      return e.country.toLowerCase().includes(standardizedCountryName);
    }
  });
  if (!country) {
    res.send("Country not found");
    return;
  }
  res.send(country);
});

// V2 ROUTES
app.get("/v2/historical/", async function (req, res) {
  let data = JSON.parse(await redis.get(keys.historical_v2))
  res.send(data);
});

app.get("/v2/historical/:country", async function (req, res) {
  let data = JSON.parse(await redis.get(keys.historical_v2));
  const countryData = await scraper.historical.getHistoricalCountryData_v2(data, req.params.country.toLowerCase());
  res.send(countryData);
});

app.get("/v2/jhucsse/", async function (req, res) {
  let data = JSON.parse(await redis.get(keys.jhu_v2))
  res.send(data);
});


app.get("/invite/", async function (req, res) {
  res.redirect("https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880")
});

app.get("/support/", async function (req, res) {
  res.redirect("https://discord.gg/EvbMshU")
});
