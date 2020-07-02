/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../server');
const countryData = require('../../utils/countries');
const { testBasicProperties } = require('../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v2/continents', () => {
	it('/v2/continents', (done) => {
		chai.request(app)
			.get('/v2/continents')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				for (const row of res.body) {
					row.should.be.a('object');
					row.should.have.property('continent');
					should.exist(row.continent);
					row.should.have.property('cases');
					should.exist(row.cases);
					row.should.have.property('todayCases');
					should.exist(row.todayCases);
					row.should.have.property('deaths');
					should.exist(row.deaths);
					row.should.have.property('todayDeaths');
					should.exist(row.todayDeaths);
					row.should.have.property('updated');
					should.exist(row.updated);
					row.should.have.property('critical');
					should.exist(row.critical);
					row.should.have.property('recovered');
					should.exist(row.recovered);
					row.should.have.property('active');
					should.exist(row.active);
					row.should.have.property('tests');
					should.exist(row.tests);
					row.should.have.property('population');
					should.exist(row.population);
					row.should.have.property('casesPerOneMillion');
					should.exist(row.casesPerOneMillion);
					row.should.have.property('deathsPerOneMillion');
					should.exist(row.deathsPerOneMillion);
					row.should.have.property('testsPerOneMillion');
					should.exist(row.testsPerOneMillion);
					row.should.have.property('activePerOneMillion');
					should.exist(row.activePerOneMillion);
					row.should.have.property('criticalPerOneMillion');
					should.exist(row.criticalPerOneMillion);
					row.should.have.property('recoveredPerOneMillion');
					should.exist(row.recoveredPerOneMillion);
					row.should.have.property('countries');
					row.countries.should.be.a('array');
				}
				done();
			});
	});

	it('/v2/continents/ get correct properties', (done) => {
		chai.request(app)
			.get('/v2/continents/europe')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('continent').eql('Europe');
				done();
			});
	});

	it('/v2/continents/ fuzzy search', (done) => {
		chai.request(app)
			.get('/v2/continents/euro?strict=false')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('continent').eql('Europe');
				done();
			});
	});

	it('/v2/continents/ get incorrect continent name', (done) => {
		chai.request(app)
			.get('/v2/continents/asdfghjkl')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/continents?sort works', (done) => {
		chai.request(app)
			.get('/v2/continents?sort=cases')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				let maxCases = res.body[0].cases;
				res.body.forEach((element) => {
					maxCases.should.be.at.least(element.cases);
					maxCases = element.cases;
				});
				done();
			});
	});
});

describe('TESTING /v2/all', () => {
	it('/v2/all', (done) => {
		chai.request(app)
			.get('/v2/all')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				should.exist(res.body.todayCases);
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('updated');
				should.exist(res.body.updated);
				res.body.should.have.property('critical');
				should.exist(res.body.critical);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
				res.body.should.have.property('active');
				should.exist(res.body.active);
				res.body.should.have.property('tests');
				should.exist(res.body.tests);
				res.body.should.have.property('population');
				should.exist(res.body.population);
				res.body.should.have.property('casesPerOneMillion');
				should.exist(res.body.casesPerOneMillion);
				res.body.should.have.property('deathsPerOneMillion');
				should.exist(res.body.deathsPerOneMillion);
				res.body.should.have.property('testsPerOneMillion');
				should.exist(res.body.testsPerOneMillion);
				res.body.should.have.property('activePerOneMillion');
				should.exist(res.body.activePerOneMillion);
				res.body.should.have.property('criticalPerOneMillion');
				should.exist(res.body.criticalPerOneMillion);
				res.body.should.have.property('recoveredPerOneMillion');
				should.exist(res.body.recoveredPerOneMillion);
				done();
			});
	});

	it('/v2/all?yesterday', (done) => {
		chai.request(app)
			.get('/v2/all?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				should.exist(res.body.todayCases);
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('updated');
				should.exist(res.body.updated);
				res.body.should.have.property('critical');
				should.exist(res.body.critical);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
				res.body.should.have.property('active');
				should.exist(res.body.active);
				res.body.should.have.property('tests');
				should.exist(res.body.tests);
				res.body.should.have.property('population');
				should.exist(res.body.population);
				res.body.should.have.property('casesPerOneMillion');
				should.exist(res.body.casesPerOneMillion);
				res.body.should.have.property('deathsPerOneMillion');
				should.exist(res.body.deathsPerOneMillion);
				res.body.should.have.property('testsPerOneMillion');
				should.exist(res.body.testsPerOneMillion);
				res.body.should.have.property('activePerOneMillion');
				should.exist(res.body.activePerOneMillion);
				res.body.should.have.property('criticalPerOneMillion');
				should.exist(res.body.criticalPerOneMillion);
				res.body.should.have.property('recoveredPerOneMillion');
				should.exist(res.body.recoveredPerOneMillion);
				done();
			});
	});

	it('/v2/all?yesterday', (done) => {
		chai.request(app)
			.get('/v2/all?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				should.exist(res.body.todayCases);
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('updated');
				should.exist(res.body.updated);
				res.body.should.have.property('critical');
				should.exist(res.body.critical);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
				res.body.should.have.property('active');
				should.exist(res.body.active);
				res.body.should.have.property('tests');
				should.exist(res.body.tests);
				res.body.should.have.property('population');
				should.exist(res.body.population);
				res.body.should.have.property('casesPerOneMillion');
				should.exist(res.body.casesPerOneMillion);
				res.body.should.have.property('deathsPerOneMillion');
				should.exist(res.body.deathsPerOneMillion);
				res.body.should.have.property('testsPerOneMillion');
				should.exist(res.body.testsPerOneMillion);
				res.body.should.have.property('activePerOneMillion');
				should.exist(res.body.activePerOneMillion);
				res.body.should.have.property('criticalPerOneMillion');
				should.exist(res.body.criticalPerOneMillion);
				res.body.should.have.property('recoveredPerOneMillion');
				should.exist(res.body.recoveredPerOneMillion);
				done();
			});
	});

	it('/v2/all?yesterday less than v2/all', (done) => {
		chai.request(app)
			.get('/v2/all')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				chai.request(app)
					.get('/v2/all?yesterday=true')
					.end((err2, res2) => {
						should.not.exist(err2);
						should.exist(res2);
						res2.should.have.status(200);
						res.body.cases.should.be.at.least(res2.body.cases);
						done();
					});
			});
	});

	it('/v2/all?twoDaysAgo', (done) => {
		chai.request(app)
			.get('/v2/all?twoDaysAgo=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				should.exist(res.body.todayCases);
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('updated');
				should.exist(res.body.updated);
				res.body.should.have.property('critical');
				should.exist(res.body.critical);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
				res.body.should.have.property('active');
				should.exist(res.body.active);
				res.body.should.have.property('tests');
				should.exist(res.body.tests);
				res.body.should.have.property('population');
				should.exist(res.body.population);
				res.body.should.have.property('casesPerOneMillion');
				should.exist(res.body.casesPerOneMillion);
				res.body.should.have.property('deathsPerOneMillion');
				should.exist(res.body.deathsPerOneMillion);
				res.body.should.have.property('testsPerOneMillion');
				should.exist(res.body.testsPerOneMillion);
				res.body.should.have.property('activePerOneMillion');
				should.exist(res.body.activePerOneMillion);
				res.body.should.have.property('criticalPerOneMillion');
				should.exist(res.body.criticalPerOneMillion);
				res.body.should.have.property('recoveredPerOneMillion');
				should.exist(res.body.recoveredPerOneMillion);
				done();
			});
	});

	it('/v2/all?twoDaysAgo=1', (done) => {
		chai.request(app)
			.get('/v2/all?twoDaysAgo=1')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cases');
				should.exist(res.body.cases);
				res.body.should.have.property('todayCases');
				should.exist(res.body.todayCases);
				res.body.should.have.property('deaths');
				should.exist(res.body.deaths);
				res.body.should.have.property('todayDeaths');
				should.exist(res.body.todayDeaths);
				res.body.should.have.property('updated');
				should.exist(res.body.updated);
				res.body.should.have.property('critical');
				should.exist(res.body.critical);
				res.body.should.have.property('recovered');
				should.exist(res.body.recovered);
				res.body.should.have.property('active');
				should.exist(res.body.active);
				res.body.should.have.property('tests');
				should.exist(res.body.tests);
				res.body.should.have.property('population');
				should.exist(res.body.population);
				res.body.should.have.property('casesPerOneMillion');
				should.exist(res.body.casesPerOneMillion);
				res.body.should.have.property('deathsPerOneMillion');
				should.exist(res.body.deathsPerOneMillion);
				res.body.should.have.property('testsPerOneMillion');
				should.exist(res.body.testsPerOneMillion);
				res.body.should.have.property('activePerOneMillion');
				should.exist(res.body.activePerOneMillion);
				res.body.should.have.property('criticalPerOneMillion');
				should.exist(res.body.criticalPerOneMillion);
				res.body.should.have.property('recoveredPerOneMillion');
				should.exist(res.body.recoveredPerOneMillion);
				done();
			});
	});

	it('/v2/all?twoDaysAgo less than v2/all?yesterday', (done) => {
		chai.request(app)
			.get('/v2/all?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				chai.request(app)
					.get('/v2/all?twoDaysAgo=true')
					.end((err2, res2) => {
						should.not.exist(err2);
						should.exist(res2);
						res2.should.have.status(200);
						res.body.cases.should.be.at.least(res2.body.cases);
						done();
					});
			});
	});
});

describe('TESTING /v2/countries', () => {
	it('/v2/countries/usa get correct properties', (done) => {
		chai.request(app)
			.get('/v2/countries/usa')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				res.body.should.have.property('cases');
				res.body.should.have.property('todayCases');
				res.body.should.have.property('casesPerOneMillion');
				res.body.should.have.property('deaths');
				res.body.should.have.property('todayDeaths');
				res.body.should.have.property('deathsPerOneMillion');
				res.body.should.have.property('recovered');
				res.body.should.have.property('recoveredPerOneMillion');
				res.body.should.have.property('active');
				res.body.should.have.property('activePerOneMillion');
				res.body.should.have.property('critical');
				res.body.should.have.property('criticalPerOneMillion');
				res.body.should.have.property('population');
				res.body.should.have.property('continent');
				res.body.should.have.property('updated');
				res.body.should.have.property('tests');
				res.body.should.have.property('testsPerOneMillion');
				done();
			});
	});

	it('/v2/countries/usa?yesterday get correct properties', (done) => {
		chai.request(app)
			.get('/v2/countries/usa?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				res.body.should.have.property('cases');
				res.body.should.have.property('todayCases');
				res.body.should.have.property('casesPerOneMillion');
				res.body.should.have.property('deaths');
				res.body.should.have.property('todayDeaths');
				res.body.should.have.property('deathsPerOneMillion');
				res.body.should.have.property('recovered');
				res.body.should.have.property('recoveredPerOneMillion');
				res.body.should.have.property('active');
				res.body.should.have.property('activePerOneMillion');
				res.body.should.have.property('critical');
				res.body.should.have.property('criticalPerOneMillion');
				res.body.should.have.property('population');
				res.body.should.have.property('continent');
				res.body.should.have.property('updated');
				res.body.should.have.property('tests');
				res.body.should.have.property('testsPerOneMillion');
				done();
			});
	});

	it('/v2/countries/usa?twoDaysAgo get correct properties', (done) => {
		chai.request(app)
			.get('/v2/countries/usa?twoDaysAgo=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				res.body.should.have.property('cases');
				res.body.should.have.property('todayCases');
				res.body.should.have.property('casesPerOneMillion');
				res.body.should.have.property('deaths');
				res.body.should.have.property('todayDeaths');
				res.body.should.have.property('deathsPerOneMillion');
				res.body.should.have.property('recovered');
				res.body.should.have.property('recoveredPerOneMillion');
				res.body.should.have.property('active');
				res.body.should.have.property('activePerOneMillion');
				res.body.should.have.property('critical');
				res.body.should.have.property('criticalPerOneMillion');
				res.body.should.have.property('population');
				res.body.should.have.property('continent');
				res.body.should.have.property('updated');
				res.body.should.have.property('tests');
				res.body.should.have.property('testsPerOneMillion');
				done();
			});
	});

	it('/v2/countries/ get correct alternate name', (done) => {
		chai.request(app)
			.get('/v2/countries/united%20states')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries?yesterday get correct alternate name', (done) => {
		chai.request(app)
			.get('/v2/countries/united%20states?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries?twoDaysAgo get correct alternate name', (done) => {
		chai.request(app)
			.get('/v2/countries/united%20states?twoDaysAgo=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries/ get correct ios2', (done) => {
		chai.request(app)
			.get('/v2/countries/us')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries?yesterday get correct ios2', (done) => {
		chai.request(app)
			.get('/v2/countries/us?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries?twoDaysAgo get correct ios2', (done) => {
		chai.request(app)
			.get('/v2/countries/us?twoDaysAgo=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries/ get correct id', (done) => {
		chai.request(app)
			.get('/v2/countries/840')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries?yesterday get correct id', (done) => {
		chai.request(app)
			.get('/v2/countries/840?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries?twoDaysAgo get correct id', (done) => {
		chai.request(app)
			.get('/v2/countries/840?twoDaysAgo=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('USA');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries/diamond%20princess', (done) => {
		chai.request(app)
			.get('/v2/countries/diamond%20princess')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country');
				res.body.should.have.property('countryInfo');
				done();
			});
	});

	it('/v2/countries/ get incorrect country name', (done) => {
		chai.request(app)
			.get('/v2/countries/asdfghjkl')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/countries?yesterday get incorrect country name', (done) => {
		chai.request(app)
			.get('/v2/countries/asdfghjkl?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/countries?twoDaysAgo get incorrect country name', (done) => {
		chai.request(app)
			.get('/v2/countries/asdfghjkl?twoDaysAgo=true')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/countries?sort works', (done) => {
		chai.request(app)
			.get('/v2/countries?sort=cases')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				let maxCases = res.body[0].cases;
				res.body.forEach((element) => {
					maxCases.should.be.at.least(element.cases);
					maxCases = element.cases;
				});
				done();
			});
	});

	it('/v2/countries/netherlands?strict=false gives Caribbean Netherlands', (done) => {
		chai.request(app)
			.get('/v2/countries/netherlands?strict=false')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Caribbean Netherlands');
				done();
			});
	});

	it('/v2/countries/sudan?strict=false gives South Sudan', (done) => {
		chai.request(app)
			.get('/v2/countries/sudan?strict=false')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('South Sudan');
				done();
			});
	});

	it('/v2/countries/guinea?strict=false gives Equatorial Guinea', (done) => {
		chai.request(app)
			.get('/v2/countries/guinea?strict=false')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Equatorial Guinea');
				done();
			});
	});

	it('/v2/countries/netherlands?yesterday&strict=false gives Caribbean Netherlands', (done) => {
		chai.request(app)
			.get('/v2/countries/netherlands?yesterday=true&strict=false')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Caribbean Netherlands');
				done();
			});
	});

	it('/v2/countries/sudan?yesterday=true&strict=false gives South Sudan', (done) => {
		chai.request(app)
			.get('/v2/countries/sudan?yesterday=true&strict=false')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('South Sudan');
				done();
			});
	});

	it('/v2/countries/guinea?yesterday=true&strict=false gives Equatorial Guinea', (done) => {
		chai.request(app)
			.get('/v2/countries/guinea?yesterday=true&strict=false')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('country').eql('Equatorial Guinea');
				done();
			});
	});

	it('/v2/countries?sort&yesterday=true works', (done) => {
		chai.request(app)
			.get('/v2/countries?sort=cases&yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				let maxCases = res.body[0].cases;
				res.body.forEach((element) => {
					maxCases.should.be.at.least(element.cases);
					maxCases = element.cases;
				});
				done();
			});
	});

	// Test that all countries map to their respective country
	countryData.forEach((element) => {
		it(`/v2/countries/${element.country} correct country name`, (done) => {
			chai.request(app)
				.get(`/v2/countries/${element.country}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(element.country);
						res.body.should.have.property('countryInfo');
						should.exist(res.body.countryInfo);
						res.body.should.have.property('cases');
						should.exist(res.body.cases);
						res.body.should.have.property('todayCases');
						should.exist(res.body.todayCases);
						res.body.should.have.property('casesPerOneMillion');
						should.exist(res.body.casesPerOneMillion);
						res.body.should.have.property('deaths');
						should.exist(res.body.deaths);
						res.body.should.have.property('todayDeaths');
						should.exist(res.body.todayDeaths);
						res.body.should.have.property('deathsPerOneMillion');
						should.exist(res.body.deathsPerOneMillion);
						res.body.should.have.property('recovered');
						should.exist(res.body.recovered);
						res.body.should.have.property('recoveredPerOneMillion');
						should.exist(res.body.recoveredPerOneMillion);
						res.body.should.have.property('active');
						should.exist(res.body.active);
						res.body.should.have.property('activePerOneMillion');
						should.exist(res.body.activePerOneMillion);
						res.body.should.have.property('critical');
						should.exist(res.body.critical);
						res.body.should.have.property('criticalPerOneMillion');
						should.exist(res.body.criticalPerOneMillion);
						res.body.should.have.property('population');
						should.exist(res.body.population);
						res.body.should.have.property('continent');
						should.exist(res.body.continent);
						res.body.should.have.property('updated');
						should.exist(res.body.updated);
						res.body.should.have.property('tests');
						should.exist(res.body.tests);
						res.body.should.have.property('testsPerOneMillion');
						should.exist(res.body.testsPerOneMillion);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	// Test that all yesterday countries map to their respective country
	countryData.forEach((element) => {
		it(`/v2/countries/${element.country}?yesterday=true correct country name`, (done) => {
			chai.request(app)
				.get(`/v2/countries/${element.country}?yesterday=true`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(element.country);
						res.body.should.have.property('countryInfo');
						should.exist(res.body.countryInfo);
						res.body.should.have.property('cases');
						should.exist(res.body.cases);
						res.body.should.have.property('todayCases');
						should.exist(res.body.todayCases);
						res.body.should.have.property('casesPerOneMillion');
						should.exist(res.body.casesPerOneMillion);
						res.body.should.have.property('deaths');
						should.exist(res.body.deaths);
						res.body.should.have.property('todayDeaths');
						should.exist(res.body.todayDeaths);
						res.body.should.have.property('deathsPerOneMillion');
						should.exist(res.body.deathsPerOneMillion);
						res.body.should.have.property('recovered');
						should.exist(res.body.recovered);
						res.body.should.have.property('recoveredPerOneMillion');
						should.exist(res.body.recoveredPerOneMillion);
						res.body.should.have.property('active');
						should.exist(res.body.active);
						res.body.should.have.property('activePerOneMillion');
						should.exist(res.body.activePerOneMillion);
						res.body.should.have.property('critical');
						should.exist(res.body.critical);
						res.body.should.have.property('criticalPerOneMillion');
						should.exist(res.body.criticalPerOneMillion);
						res.body.should.have.property('population');
						should.exist(res.body.population);
						res.body.should.have.property('continent');
						should.exist(res.body.continent);
						res.body.should.have.property('updated');
						should.exist(res.body.updated);
						res.body.should.have.property('tests');
						should.exist(res.body.tests);
						res.body.should.have.property('testsPerOneMillion');
						should.exist(res.body.testsPerOneMillion);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	// Test that all twoDaysAgo countries map to their respective country
	countryData.forEach((element) => {
		it(`/v2/countries/${element.country}?twoDaysAgo=true correct country name`, (done) => {
			chai.request(app)
				.get(`/v2/countries/${element.country}?twoDaysAgo=true`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(element.country);
						res.body.should.have.property('countryInfo');
						should.exist(res.body.countryInfo);
						res.body.should.have.property('cases');
						should.exist(res.body.cases);
						res.body.should.have.property('todayCases');
						should.exist(res.body.todayCases);
						res.body.should.have.property('casesPerOneMillion');
						should.exist(res.body.casesPerOneMillion);
						res.body.should.have.property('deaths');
						should.exist(res.body.deaths);
						res.body.should.have.property('todayDeaths');
						should.exist(res.body.todayDeaths);
						res.body.should.have.property('deathsPerOneMillion');
						should.exist(res.body.deathsPerOneMillion);
						res.body.should.have.property('recovered');
						should.exist(res.body.recovered);
						res.body.should.have.property('recoveredPerOneMillion');
						should.exist(res.body.recoveredPerOneMillion);
						res.body.should.have.property('active');
						should.exist(res.body.active);
						res.body.should.have.property('activePerOneMillion');
						should.exist(res.body.activePerOneMillion);
						res.body.should.have.property('critical');
						should.exist(res.body.critical);
						res.body.should.have.property('criticalPerOneMillion');
						should.exist(res.body.criticalPerOneMillion);
						res.body.should.have.property('population');
						should.exist(res.body.population);
						res.body.should.have.property('continent');
						should.exist(res.body.continent);
						res.body.should.have.property('updated');
						should.exist(res.body.updated);
						res.body.should.have.property('tests');
						should.exist(res.body.tests);
						res.body.should.have.property('testsPerOneMillion');
						should.exist(res.body.testsPerOneMillion);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});
});

describe('TESTING /v2/states', () => {
	it('/v2/states', (done) => {
		chai.request(app)
			.get('/v2/states')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				for (const row of res.body) {
					row.should.have.property('state');
					should.exist(row.state);
					row.should.have.property('cases');
					should.exist(row.cases);
					row.should.have.property('todayCases');
					should.exist(row.todayCases);
					row.should.have.property('deaths');
					should.exist(row.deaths);
					row.should.have.property('todayDeaths');
					should.exist(row.todayDeaths);
					row.should.have.property('active');
					should.exist(row.active);
					row.should.have.property('tests');
					should.exist(row.tests);
					row.should.have.property('updated');
					should.exist(row.updated);
					row.should.have.property('testsPerOneMillion');
					should.exist(row.testsPerOneMillion);
				}
				done();
			});
	});

	it('/v2/states?yesterday=true', (done) => {
		chai.request(app)
			.get('/v2/states?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/states?sort works', (done) => {
		chai.request(app)
			.get('/v2/states?sort=cases')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				let maxCases = res.body[0].cases;
				res.body.forEach((element) => {
					maxCases.should.be.at.least(element.cases);
					maxCases = element.cases;
				});
				done();
			});
	});

	it('/v2/states?sort&yesterday works', (done) => {
		chai.request(app)
			.get('/v2/states?sort=cases&yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				let maxCases = res.body[0].cases;
				res.body.forEach((element) => {
					maxCases.should.be.at.least(element.cases);
					maxCases = element.cases;
				});
				done();
			});
	});

	it('/v2/states?sort bad param', (done) => {
		chai.request(app)
			.get('/v2/states?sort=gsdfb325fsd')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/states?sort&yesterday=true bad param', (done) => {
		chai.request(app)
			.get('/v2/states?sort=gsdfb325fsd&yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/states/state works', (done) => {
		chai.request(app)
			.get('/v2/states/Illinois')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.state.should.equal('Illinois');
				res.body.should.have.property('cases');
				res.body.should.have.property('todayCases');
				res.body.should.have.property('deaths');
				res.body.should.have.property('todayDeaths');
				res.body.should.have.property('active');
				res.body.should.have.property('tests');
				res.body.should.have.property('testsPerOneMillion');
				done();
			});
	});

	it('/v2/states/state?yesterday=true works', (done) => {
		chai.request(app)
			.get('/v2/states/Illinois')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.state.should.equal('Illinois');
				res.body.should.have.property('cases');
				res.body.should.have.property('todayCases');
				res.body.should.have.property('deaths');
				res.body.should.have.property('todayDeaths');
				res.body.should.have.property('active');
				res.body.should.have.property('tests');
				res.body.should.have.property('testsPerOneMillion');
				done();
			});
	});

	it('/v2/states/state1,state2', (done) => {
		chai.request(app)
			.get('/v2/states/Illinois,New%20York')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				for (const row of res.body) {
					row.should.have.property('cases');
					row.should.have.property('todayCases');
					row.should.have.property('deaths');
					row.should.have.property('todayDeaths');
					row.should.have.property('active');
					row.should.have.property('tests');
					row.should.have.property('testsPerOneMillion');
				}
				done();
			});
	});

	it('/v2/states/state1,state2?yesterday=true', (done) => {
		chai.request(app)
			.get('/v2/states/Illinois,New%20York?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				for (const row of res.body) {
					row.should.have.property('cases');
					row.should.have.property('todayCases');
					row.should.have.property('deaths');
					row.should.have.property('todayDeaths');
					row.should.have.property('active');
					row.should.have.property('tests');
					row.should.have.property('testsPerOneMillion');
				}
				done();
			});
	});

	it('/v2/states/ get incorrect state name', (done) => {
		chai.request(app)
			.get('/v2/states/asdfghjkl')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/states?yesterday=true get incorrect state name', (done) => {
		chai.request(app)
			.get('/v2/states/asdfghjkl?yesterday=true')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/states/state?yesterday is less than today', (done) => {
		chai.request(app)
			.get('/v2/states/illinois?yesterday=true')
			.end((err, yesterdayRes) => {
				should.not.exist(err);
				should.exist(yesterdayRes);
				yesterdayRes.should.have.status(200);
				yesterdayRes.body.should.be.a('object');
				chai.request(app)
					.get('/v2/states/illinois')
					.end((err2, todayRes) => {
						should.not.exist(err2);
						should.exist(todayRes);
						todayRes.should.have.status(200);
						todayRes.body.should.be.a('object');
						todayRes.body.cases.should.be.at.least(yesterdayRes.body.cases);
						done();
					});
			});
	});
});
