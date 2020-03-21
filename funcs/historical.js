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

/**
 * Parses data from historical endpoint to and returns data for specific country. US requires more specialized data sanitization. 
 * @param {*} data: full historical data returned from /historical endpoint 
 * @param {*} country: country query param
 */
async function getHistoricalCountryData(data, country) {
  var countryData;
  if (country == "us") {
    // get all valid states from /states endpoint
    const response = await axios.get(`https://corona.lmao.ninja/states`);
    const stateData = response.data;
    const states = stateData.map(obj => {
      return obj.state.toLowerCase();
    });
    // filter /historical data on country name and all valid US states
    countryData = data.filter(obj => {
      if (obj.province != null) {
        return obj.country.toLowerCase() == country && states.filter(state => state == obj.province.toLowerCase()).length > 0;
      }
    });
  }
  else {
    // countries with null as province have one entry in /historical, but all others have province=country
    countryData = data.filter(obj => {
      return obj.country.toLowerCase() == country;
    });
  }

  // overall timeline for country
  const timeline = {cases: {}, deaths: {}, recovered: {}};

  // sum over provinces
  for (var province = 0; province < countryData.length; province++) {
    // loop cases, recovered, deaths for each province
    Object.keys(countryData[province].timeline).forEach(specifier => {
      Object.keys(countryData[province].timeline[specifier]).forEach(date => {
        if (timeline[specifier][date]) {
          timeline[specifier][date] += parseInt(countryData[province].timeline[specifier][date]);
        }
        else {
          timeline[specifier][date] = parseInt(countryData[province].timeline[specifier][date]);
        }
      });
    });
  }

  return ({
    country,
    timeline
  });

}

module.exports = {
  historical,
  getHistoricalCountryData
};
