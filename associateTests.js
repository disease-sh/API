const v2Tests = [
	'tests/v2/api_apple.spec.js',
	'tests/v2/api_deprecated.spec.js',
	'tests/v2/api_historical.spec.js',
	'tests/v2/api_nyt.spec.js',
	'tests/v2/api_worldometers.spec.js'
];

const v3CovidTests = [
	'tests/v3/covid-19/api_apple.spec.js',
	'tests/v3/covid-19/api_deprecated.spec.js',
	'tests/v3/covid-19/api_historical.spec.js',
	'tests/v3/covid-19/api_jhucsse.spec.js',
	'tests/v3/covid-19/api_nyt.spec.js',
	'tests/v3/covid-19/api_therapeutics.spec.js',
	'tests/v3/covid-19/api_vaccine.spec.js',
	'tests/v3/covid-19/api_worldometers.spec.js',
	'tests/v3/covid-19/api_variants.spec.js'
];

// Influenza tests are broken

const allTests = [
	...v2Tests,
	...v3CovidTests
];

const fileDirToTestMap = {
	'config/': allTests,
	'scrapers/covid-19/govScrapers/': ['tests/v3/covid-19/api_gov.spec.js'],
	'tests/v2/': v2Tests,
	'tests/v3/covid-19/': v3CovidTests,
	'utils/': allTests
};

const fileNameToTestMap = {
	'apiApple.js': ['tests/v2/api_apple.spec.js', 'tests/v3/covid-19/api_apple.spec.js'],
	'apiGov.js': ['tests/v3/covid-19/api_gov.spec.js'],
	'apiHistorical.js': ['tests/v2/api_historical.spec.js', 'tests/v3/covid-19/api_historical.spec.js'],
	'apiJHUCSSE.js': ['tests/v3/covid-19/api_jhucsse.spec.js'],
	'apiNYT.js': ['tests/v2/api_nyt.spec.js', 'tests/v3/covid-19/api_nyt.spec.js'],
	'apiWorldometers.js': ['tests/v2/api_worldometers.spec.js', 'tests/v3/covid-19/api_worldometers.spec.js'],
	'apiTherapeutics.js': ['tests/v3/covid-19/api_therapeutics.spec.js'],
	'apiVaccine.js': ['tests/v3/covid-19/api_vaccine.spec.js'],
	'apiVariants.js': ['tests/v3/covid-19/api_variants.spec.js'],
	'instances.js': allTests,
	'appleMobilityData.js': ['tests/v2/api_apple.spec.js', 'tests/v3/covid-19/api_apple.spec.js'],
	'getVaccine.js': ['tests/v3/covid-19/api_vaccine.spec.js'],
	'historical.js': ['tests/v2/api_historical.spec.js', 'tests/v3/covid-19/api_historical.spec.js'],
	'getStates.js': ['tests/v2/api_worldometers.spec.js', 'tests/v3/covid-19/api_worldometers.spec.js'],
	'getWorldometers.js': ['tests/v2/api_worldometers.spec.js', 'tests/v3/covid-19/api_worldometers.spec.js'],
	'jhuLocations.js': ['tests/v3/covid-19/api_jhucsse.spec.js'],
	'getTherapeutics.js': ['tests/v3/covid-19/api_therapeutics.spec.js'],
	'nytData.js': ['tests/v2/api_nyt.spec.js', 'tests/v3/covid-19/api_nyt.spec.js'],
	'mochaSetup.spec.js': allTests,
	'testingFunctions.js': allTests,
	'package.json': allTests,
	'package-lock.json': allTests,
	'server.js': allTests,
	'serverScraper.js': allTests
};

const tests = new Set();

process.argv.splice(2).forEach(fl => {
	var fileDir = fl.replace(/[^/]*$/, '');
	var fileDirTests = fileDirToTestMap[fileDir];
	var fileName = fl.replace(/^.*[\\/]/, '');
	var fileNameTests = fileNameToTestMap[fileName];
	if (fileDirTests) fileDirTests.forEach(test => tests.add(test));
	else if (fileNameTests) fileNameTests.forEach(test => tests.add(test));
});

tests.forEach(test => process.stdout.write(`${test} `));
process.stdout.write('\n');
