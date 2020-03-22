const scraper = require('./scraper');
const s3Client = require('./s3');
var axios = require("axios");

const countriesPayload = axios.get('https://www.worldometers.info/coronavirus/')
  .then(
    response => {
    if (response.data) {
      scraper.getCountries(s3Client, response);
    }
  })
  .catch(
    error => {
    console.log("ERROR");
    console.log(error)
  })

/*const execAll = () => {
    scraper.getCountries(s3Client, countriesPayload);
    scraper.getAll(s3Client, countriesPayload);
    scraper.getStates(s3Client);
    scraper.jhuLocations(s3Client);
    scraper.Historical(s3Client);
};

execAll()*/
