var axios = require("axios");
var cheerio = require("cheerio");

var getStates = async (keys, redis) => {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/country/us/");
    if (response.status !== 200) {
      console.log("Error", response.status);
    }
  } catch (err) {
      console.log(err)
    return null;
  }
  // to store parsed data
  const result = [];
  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  const statesTable = html("table#usa_table_countries_today");
  const tablecells = statesTable
    .children("tbody")
    .children("tr")
    .children("td");
  // NOTE: this will change when table format change in website
  const totalColumns = 7;
  const stateColIndex = 0;
  const casesColIndex = 1;
  const todayCasesColIndex = 2;
  const deathsColIndex = 3;
  const todayDeathsColIndex = 4;
  //const curedColIndex = 5;
  const activeColIndex = 5;
  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < tablecells.length - totalColumns; i += 1) {
    const cell = tablecells[i];

    // get state
    if (i % totalColumns === stateColIndex) {
      let state =
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // state name with link has another level
        cell.children[0].children[0].children[0].data ||
        cell.children[0].children[0].children[0].children[0].data ||
        "";
      state = state.trim();
      if (state.length === 0) {
        // parse with hyperlink
        state = cell.children[0].next.children[0].data || "";
      }
      result.push({ state: state.trim() || "" });
    }
    // get cases
    if (i % totalColumns === casesColIndex) {
      let cases = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].cases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today cases
    if (i % totalColumns === todayCasesColIndex) {
      let cases = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].todayCases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get deaths
    if (i % totalColumns === deathsColIndex) {
      let deaths = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].deaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today deaths
    if (i % totalColumns === todayDeathsColIndex) {
      let deaths = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].todayDeaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get cured
   /* if (i % totalColumns === curedColIndex) {
      let cured = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].recovered = parseInt(
        cured.trim().replace(/,/g, "") || 0,
        10
      );
    } // removed from API
    // get active
    if (i % totalColumns === activeColIndex) {
      let cured = cell.children.length != 0 ? cell.children[0].data : "";
      result[result.length - 1].active = parseInt(
        cured.trim().replace(/,/g, "") || 0,
        10
      );
    }*/
  }

  const string = JSON.stringify(result);
  redis.set(keys.states, string);
  console.log(`Updated states: ${result.length} states`);
}

module.exports = getStates;
