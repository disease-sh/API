var cheerio = require("cheerio");

var getAll = async (s3Client, response) => {
  const OBJECT_NAME = "overall.json";

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

  result.updated = Date.now();
  const payload = JSON.stringify(result, 0, 2);
  s3Client.uploadFile(OBJECT_NAME, payload);
}

module.exports = getAll;