/**
 * WIP country mapping for countries that could be spelled differently than what we are expecting
 */
const countryMapping = [
    {possibleNames: ["us", "united states of america", "america", "united states"], standardizedName: "usa"},
    {possibleNames: ["south korea", "korea, south"], standardizedName: "s. korea"},
    {possibleNames: ["united kingdom", "england"], standardizedName: "uk"},
    {possibleNames: ["dr"], standardizedName: "dominican republic"},
    {possibleNames: ["united arab emirates"], standardizedName: "uae"},
    {possibleNames: ["bosnia and herzegovina"], standardizedName: "bosnia"},
    {possibleNames: ["virgin islands"], standardizedName: "u.s. virgin islands"},
    {possibleNames: ["czech republic"], standardizedName: "czechia"},
    {possibleNames: ["méxico"], standardizedName: "mexico"},
    {possibleNames: ["brasil"], standardizedName: "brazil"},
    {possibleNames: ["panamá"], standardizedName: "panama"},
];

/**
 * Takes a country name and gives back the standardized name, if a change is needed
 */
function standardizeCountryName(countryName) {
    const possibleMapping = countryMapping.filter(mapping => mapping.possibleNames.indexOf(countryName) >= 0);
    return (possibleMapping.length == 1 ? possibleMapping[0].standardizedName : countryName.toLowerCase());
}

module.exports = {
    standardizeCountryName
}
