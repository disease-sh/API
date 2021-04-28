/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');
const countryData = require('../../../utils/countries');
const should = chai.should();
chai.use(chaiHttp);

describe.skip('TESTING /v3/covid-19/vaccine', () => {
	it('/v3/covid-19/vaccine correct type', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.data.length.should.be.at.least(1);
				done();
			});
	});
	it('/v3/covid-19/vaccine correct attributes', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('source');
				res.body.should.have.property('totalCandidates');
				res.body.should.have.property('phases');
				res.body.phases.forEach(element => {
					element.should.have.property('phase');
					element.should.have.property('candidates');
				});
				res.body.data.forEach(element => {
					element.should.have.property('candidate');
					element.should.have.property('sponsors');
					element.should.have.property('details');
					element.should.have.property('trialPhase');
					element.should.have.property('institutions');
					element.should.have.property('mechanism');
				});
				done();
			});
	});
});

describe('Testing /v3/covid-19/vaccine/ vaccine coverage', () => {
	it('/v3/covid-19/vaccine/coverage should return world vaccine coverage data', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				Object.keys(res.body).length.should.not.equal(0);
				Object.keys(res.body).length.should.equal(30);
				done();
			});
	});
	it('/v3/covid-19/vaccine/coverage should return correct number of specified dates', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage?lastdays=10')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				Object.keys(res.body).length.should.equal(10);
				done();
			});
	});
	it('/v3/covid-19/vaccine/coverage should return correct number of specified dates', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage?lastdays=justForTesting')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				Object.keys(res.body).length.should.equal(30);
				done();
			});
	});

	it('/v3/covid-19/vaccine/coverage should return a list of full data objects', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage?fullData=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(30);
				assertFullDataTimelineStructure(res.body);
				done();
			});
	});

	it('/v3/covid-19/vaccine/coverage/countries should return countries vaccine coverage data', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/countries')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.not.equal(0);
				res.body[0].should.have.property('country');
				res.body[0].should.have.property('timeline');
				Object.keys(res.body[0].timeline).length.should.equal(30);
				done();
			});
	});
	it('/v3/covid-19/vaccine/coverage/countries should return requested number of days', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/countries?lastdays=1')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.not.equal(0);
				res.body[0].should.have.property('country');
				res.body[0].should.have.property('timeline');
				Object.keys(res.body[0].timeline).length.should.equal(1);
				done();
			});
	});
	it('/v3/covid-19/vaccine/coverage/countries should return requested number of days', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/countries?lastdays=all')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.not.equal(0);
				res.body[0].should.have.property('country');
				res.body[0].should.have.property('timeline');
				Object.keys(res.body[0].timeline).length.should.not.equal(0);
				done();
			});
	});

	it('/v3/covid-19/vaccine/coverage/countries should return full data for each country', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/countries?fullData=true')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.not.equal(0);
				res.body[0].should.have.property('country');
				res.body[0].should.have.property('timeline');
				res.body[0].timeline.should.be.a('array');
				res.body[0].timeline.length.should.equal(30);
				assertFullDataTimelineStructure(res.body[0].timeline);
				done();
			});
	});

	it('/v3/covid-19/vaccine/coverage/countries/non_existent_country incorrect country name', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/countries/non_existent_country')
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res);
				testBasicProperties(err, res, 404, 'object');
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				done();
			});
	});

	// Ensures correct vaccine data is retrieved using country name
	countryData.forEach((countryObject) => {
		it(`/v3/covid-19/vaccine/coverage/countries/${countryObject.country} correct country name`, (done) => {
			chai.request(app)
				.get(`/v3/covid-19/vaccine/coverage/countries/${countryObject.country}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.should.have.property('country');
						res.body.should.have.property('timeline');
						Object.keys(res.body.timeline).length.should.equal(30);
						res.body.country.should.equal(countryObject.country);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	// Ensures correct vaccine data is retrieved using country iso2 code
	countryData.forEach((countryObject) => {
		it(`/v3/covid-19/vaccine/coverage/countries/${countryObject.iso2} correct country name`, (done) => {
			chai.request(app)
				.get(`/v3/covid-19/vaccine/coverage/countries/${countryObject.iso2}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.should.have.property('country');
						res.body.should.have.property('timeline');
						Object.keys(res.body.timeline).length.should.equal(30);
						res.body.country.should.equal(countryObject.country);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	// Ensures correct vaccine data is retrieved using country iso3 code
	countryData.forEach((countryObject) => {
		it(`/v3/covid-19/vaccine/coverage/countries/${countryObject.iso3} correct country name`, (done) => {
			chai.request(app)
				.get(`/v3/covid-19/vaccine/coverage/countries/${countryObject.iso3}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.should.have.property('country');
						res.body.should.have.property('timeline');
						Object.keys(res.body.timeline).length.should.equal(30);
						res.body.country.should.equal(countryObject.country);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});
});

function assertFullDataTimelineStructure(fullDataTimeline) {
	fullDataTimeline[0].should.have.property('total');
	fullDataTimeline[0].should.have.property('daily');
	fullDataTimeline[0].should.have.property('totalPerHundred');
	fullDataTimeline[0].should.have.property('dailyPerMillion');
	fullDataTimeline[0].should.have.property('date');
}
