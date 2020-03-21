var axios = require("axios");
var cheerio = require("cheerio");
const csv = require('csvtojson')

var base = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/"

var historical = async (keys, redis) => {
  let casesResponse, deathsResponse, recResponse;
  const date = new Date();
  try {
    casesResponse = await axios.get(`${base}time_series_19-covid-Confirmed.csv`);
    deathsResponse = await axios.get(`${base}time_series_19-covid-Deaths.csv`);
    recResponse = await axios.get(`${base}time_series_19-covid-Recovered.csv`);
  } catch (err) {
      console.log(err)
      return null;
  }

  const parsedCases = await csv({
    noheader:true,
    output: "csv"
  }).fromString(casesResponse.data);
  
  const parsedDeaths = await csv({
    noheader:true,
    output: "csv"
  }).fromString(deathsResponse.data);

  const recParsed = await csv({
    noheader:true,
    output: "csv"
  }).fromString(recResponse.data);
  
  // to store parsed data
  const result = [];
  const timelineKey = parsedCases[0].splice(4);
  // parsedCases.pop()
  // parsedDeaths.pop()
  // recParsed.pop()

  for (let b = 0; b < parsedDeaths.length;) {
    const timeline = {
      cases: {},
      deaths: {},
      recovered: {}
    }
    const c = parsedCases[b].splice(4);
    const r = recParsed[b].splice(4);
    const d = parsedDeaths[b].splice(4);
    for (let i = 0; i < c.length; i++) {
      timeline.cases[timelineKey[i]] = c[i]
      timeline.deaths[timelineKey[i]] = d[i]
      timeline.recovered[timelineKey[i]] = r[i]
    }
    result.push({
      country: parsedCases[b][1],
      province: parsedCases[b][0] === "" ? null : parsedCases[b][0],
      timeline
    })
    b++;
  }
  
  const removeFirstObj = result.splice(1);
  const string = JSON.stringify(removeFirstObj);
  redis.set(keys.historical, string);
  console.log(`Updated JHU CSSE Historical: ${result.length} locations`);
}

module.exports = historical;
