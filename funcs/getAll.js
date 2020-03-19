var axios = require("axios");
var cheerio = require("cheerio");

var getall = async (keys, redis) => {
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
  result.updated = Date.now()
  const string = JSON.stringify(result);
  redis.set(keys.all, string);
  console.log("Updated The Cases", result);
}

module.exports = getall;