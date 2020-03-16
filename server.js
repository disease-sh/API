var express = require("express");
var app = express();
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("quick.db");

var getall = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("ERROR");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = {};

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  html(".maincounter-number").filter((i, el) => {
    let count = el.children[0].next.children[0].data || "0";
    count = parseInt(count.replace(/,/g, "") || "0", 10);
    // first one is
    if (i === 0) {
      result.cases = count;
    } else if (i === 1) {
      result.deaths = count;
    } else {
      result.recovered = count;
    }
  });

  db.set("all", result);
  console.log("Updated The Cases", result);
}, 60000);

var getcountries = setInterval(async () => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("Error", response.status);
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  const countriesTable = html("table#main_table_countries");
  const countriesTableCells = countriesTable
    .children("tbody")
    .children("tr")
    .children("td");

  // NOTE: this will change when table format change in website
  const totalColumns = 9;
  const countryColIndex = 0;
  const casesColIndex = 1;
  const todayCasesColIndex = 2;
  const deathsColIndex = 3;
  const todayDeathsColIndex = 4;
  const curedColIndex = 5;
  const criticalColIndex = 7;

  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < countriesTableCells.length - totalColumns; i += 1) {
    const cell = countriesTableCells[i];

    // get country
    if (i % totalColumns === countryColIndex) {
      let country =
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // country name with link has another level
        cell.children[0].children[0].children[0].data ||
        cell.children[0].children[0].children[0].children[0].data ||
        "";
      country = country.trim();
      if (country.length === 0) {
        // parse with hyperlink
        country = cell.children[0].next.children[0].data || "";
      }
      result.push({ country: country.trim() || "" });
    }
    // get cases
    if (i % totalColumns === casesColIndex) {
      let cases = cell.children[0].data || "";
      result[result.length - 1].cases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today cases
    if (i % totalColumns === todayCasesColIndex) {
      let cases = cell.children[0].data || "";
      result[result.length - 1].todayCases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get deaths
    if (i % totalColumns === deathsColIndex) {
      let deaths = cell.children[0].data || "";
      result[result.length - 1].deaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today deaths
    if (i % totalColumns === todayDeathsColIndex) {
      let deaths = cell.children[0].data || "";
      result[result.length - 1].todayDeaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get cured
    if (i % totalColumns === curedColIndex) {
      let cured = cell.children[0].data || 0;
      result[result.length - 1].recovered = parseInt(
        cured.trim().replace(/,/g, "") || 0,
        10
      );
    }
    // get critical
    if (i % totalColumns === criticalColIndex) {
      let critical = cell.children[0].data || "";
      result[result.length - 1].critical = parseInt(
        critical.trim().replace(/,/g, "") || "0",
        10
      );
    }
  }

  db.set("countries", result);
  console.log("Updated The Countries", result);
}, 60000);

app.get("/", async function(request, response) {
  let a = await db.fetch("all");
  response.send(
    `${a.cases} cases are reported of the COVID-19 Novel Coronavirus strain<br> ${a.deaths} have died from it <br>\n${a.recovered} have recovered from it <br> Get the endpoint /all to get information for all cases <br> get the endpoint /countries for getting the data sorted country wise`
  );
});

var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/all/", async function(req, res) {
  let all = await db.fetch("all");
  res.send(all);
});

app.get("/invite/", async function(req, res) {
  res.redirect("https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=52224")
});

app.get("/countries/", async function(req, res) {
  let countries = await db.fetch("countries");
  res.send(countries);
});

app.get("/countries/:country", async function(req, res) {
  let countries = await db.fetch("countries");
  let country = countries.find(
    e => e.country.toLowerCase() === req.params.country
  );
  if (!country) {
    res.sendStatus(404);
    res.send("Country not found");
    return;
  }
  res.send(country);
});
