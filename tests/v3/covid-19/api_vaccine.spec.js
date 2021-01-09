/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');
const countryData = require('../../../utils/countries');
const should = chai.should();
chai.use(chaiHttp);
/*
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
*/
describe('Testing /v3/covid-19/vaccine/ vaccine coverage', () => {
	it('/v3/covid-19/vaccine/coverage should return world vaccine coverage data', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				Object.keys(res.body).length.should.not.equal(0);
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
						Object.keys(res.body.timeline).length.should.not.equal(0);
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
						Object.keys(res.body.timeline).length.should.not.equal(0);
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
						Object.keys(res.body.timeline).length.should.not.equal(0);
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
