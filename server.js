var express = require('express');
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");
var cors = require('cors');
const config = require('./config.json');
const Redis = require('ioredis');
const scraper = require('./scraper');

app.use(cors());

// create redis instance :O
const redis = new Redis(config.redis.host, {
  password: config.redis.password || null,
  port: config.redis.port || null
})

const keys = config.keys;

const execAll = () => {
    scraper.getCountries(keys, redis);
    scraper.getAll(keys, redis);
    scraper.getStates(keys, redis);
};
execAll()
setInterval(execAll, config.interval);

app.get("/", async function (request, response) {
  let a = JSON.parse(await redis.get(keys.all))
  response.send(
    `${a.cases} cases are reported of the COVID-19 Novel Coronavirus strain<br> ${a.deaths} have died from it <br>\n${a.recovered} have recovered from it <br> Get the endpoint /all to get information for all cases <br> get the endpoint /countries for getting the data sorted country wise<br><a href="https://discord.gg/EvbMshU">Join our discord server too!</a><br> <a href="https://github.com/NovelCOVID/API">Star the GitHub!</a> `);
});
var listener = app.listen(config.port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
app.get("/all/", async function (req, res) {
  let all = JSON.parse(await redis.get(keys.all))
  res.send(all);
});
app.get("/countries/", async function (req, res) {
  let countries = JSON.parse(await redis.get(keys.countries))
  res.send(countries);
});
app.get("/states/", async function (req, res) {
  let states = JSON.parse(await redis.get(keys.states))
  res.send(states);
});
app.get("/countries/:country", async function (req, res) {
  let countries = JSON.parse(await redis.get(keys.countries))
  let country = countries.find(
    e => e.country.toLowerCase().includes(req.params.country.toLowerCase())
  );
  if (!country) {
    res.send("Country not found");
    return;
  }
  res.send(country);
});
app.get("/invite/", async function (req, res) {
  res.redirect("https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880")
});

app.get("/support/", async function (req, res) {
  res.redirect("https://discord.gg/EvbMshU")
});
