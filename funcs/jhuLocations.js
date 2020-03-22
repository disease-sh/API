var axios = require("axios");
const csv = require('csvtojson')

var base = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"

var jhuData = async (s3Client) => {
  const OBJECT_NAME = "jhucss.json";

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
        latitude: loc[6],
        longitude: loc[7]
      }
    })
  }
  const payload = JSON.stringify(result, 0, 2);
  s3Client.uploadFile(OBJECT_NAME, payload);
}

module.exports = jhuData;