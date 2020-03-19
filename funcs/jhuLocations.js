var axios = require("axios");
var cheerio = require("cheerio");
const csv = require('csvtojson')

var base = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"

var jhudata = async (keys, redis) => {
  let response;
  const date = new Date();
  try {
    response = await axios.get(`${base}0${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}.csv`);
    console.log(`USING 0${date.getMonth()+1}-${date.getDate()-1}-${date.getFullYear()}.csv CSSEGISandData`)
  } catch (err) {
    response = await axios.get(`${base}0${date.getMonth()+1}-${date.getDate()-1}-${date.getFullYear()}.csv`);
    console.log(`USING 0${date.getMonth()+1}-${date.getDate()-1}-${date.getFullYear()}.csv CSSEGISandData`)
  }

  const parsed = await csv({
    noheader:true,
    output: "csv"
  }).fromString(response.data);
  
  // to store parsed data
  const result = [];

  for (const loc of parsed) {
    result.push({
      country: loc[1],
      province: loc[0] === "" ? null : loc[0],
      updatedAt: loc[2],
      stats: {
        confirmed: loc[3],
        deaths: loc[4],
        recovered: loc[5]
      },
      coordinates: {
        lattitude: loc[6],
        longitude: loc[7]
      }
    })
  }
  const string = JSON.stringify(result);
  redis.set(keys.jhu, string);
  console.log(`Updated JHU CSSE: ${result.length} locations`);
}

module.exports = jhudata;