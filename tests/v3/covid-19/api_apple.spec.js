/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v3/covid-19/apple/countries', () => {
	it('/v3/covid-19/apple/countries correct type', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.be.at.least(1);
				done();
			});
	});
});

describe('TESTING /v3/covid-19/apple/countries/country', () => {
	it('/v3/covid-19/apple/countries/country correct for all valid', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.slice(0, 10).forEach((countryName) => {
					chai.request(app)
						.get(`/v3/covid-19/apple/countries/${countryName}`)
						.end((err2, res2) => {
							testBasicProperties(err2, res2, 200, 'object');
							res2.body.should.have.property('country').eql(countryName);
							res2.body.should.have.property('subregions');
							res2.body.subregions.length.should.be.at.least(1);
						});
				});
				done();
			});
	});

	it('/v3/covid-19/apple/countries/country correct for invalid country', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries/agfdsdh')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});
});

describe('TESTING /v3/covid-19/apple/countries/country/subregions', () => {
	it('/v3/covid-19/apple/countries/country/all correct for some valid', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.slice(0, 10).forEach((countryName) => {
					chai.request(app)
						.get(`/v3/covid-19/apple/countries/${countryName}/all`)
						.end((err2, res2) => {
							testBasicProperties(err2, res2, 200, 'object');
							res2.body.should.have.property('subregion').eql('All');
							res2.body.should.have.property('data');
							res2.body.data.length.should.be.at.least(1);
							res2.body.data[0].should.have.property('subregion_and_city');
							res2.body.data[0].should.have.property('geo_type');
							res2.body.data[0].should.have.property('date');
							res2.body.data[0].should.have.property('driving');
							res2.body.data[0].should.have.property('transit');
							res2.body.data[0].should.have.property('walking');
						});
				});
				done();
			});
	});

	it('/v3/covid-19/apple/countries/country/all correct for invalid country', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries/agfdsdh/all')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v3/covid-19/apple/countries/country/all correct for valid subregion list', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries/usa/illinois, chicago')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(2);
				res.body[0].should.have.property('subregion').eql('Illinois');
				res.body[0].should.have.property('data');
				res.body[0].data.length.should.be.at.least(1);
				res.body[1].should.have.property('subregion').eql('Chicago');
				res.body[1].should.have.property('data');
				res.body[1].data.length.should.be.at.least(1);
				done();
			});
	});

	it('/v3/covid-19/apple/countries/country/all correct for invalid single sugbregion', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries/usa/dasgf')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v3/covid-19/apple/countries/country/all correct for mixed subregion list', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries/usa/weytsdg, illinois')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(2);
				res.body[0].should.have.property('message');
				res.body[1].should.have.property('subregion').eql('Illinois');
				res.body[1].should.have.property('data');
				res.body[1].data.length.should.be.at.least(1);
				done();
			});
	});

	it('/v3/covid-19/apple/countries/country/all correct for invalid subregion list', (done) => {
		chai.request(app)
			.get('/v3/covid-19/apple/countries/usa/dasgf, weytsdg')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(2);
				res.body[0].should.have.property('message');
				res.body[1].should.have.property('message');
				done();
			});
	});
});
