var filterCountries = (query, countries) => {

  query = query.split("'");
  console.log(query);

  let filter = {
    key: query[0],
    operator: query[1] == '=' ? '==' : query[1], // Change the operator '=' to '=='
    value: query[2],
  };

  let validKeys = ['cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion'];
  let validOperators = ['==', '>', '<'];

  // Verify if the query is valid
  // If the query is valid it filter, else the function returns all countries
  if (query.length === 3 && validKeys.includes(filter.key) && validOperators.includes(filter.operator)) {
    // filter
    countries = countries.filter(function (country) {
      let string = country[filter.key] + filter.operator + filter.value;
      return eval(string);
    });
  }

  return countries;

}

module.exports = filterCountries;
