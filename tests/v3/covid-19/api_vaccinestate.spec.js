/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');
const should = chai.should();
chai.use(chaiHttp);

describe('Testing /v3/covid-19/vaccine/coverage/states vaccine state coverage', () => {
	it('/v3/covid-19/vaccine/coverage/states should return states vaccine coverage data', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/states')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.not.equal(0);
				res.body[0].should.have.property('state');
				res.body[0].should.have.property('timeline');
				Object.keys(res.body[0].timeline).length.should.equal(30);
				done();
			});
	});
	it('/v3/covid-19/vaccine/coverage/states should return requested number of days', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/states?lastdays=1')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.not.equal(0);
				res.body[0].should.have.property('state');
				res.body[0].should.have.property('timeline');
				Object.keys(res.body[0].timeline).length.should.equal(1);
				done();
			});
	});
	it('/v3/covid-19/vaccine/coverage/states should return requested number of days', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/states?lastdays=all')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.not.equal(0);
				res.body[0].should.have.property('state');
				res.body[0].should.have.property('timeline');
				Object.keys(res.body[0].timeline).length.should.not.equal(0);
				done();
			});
	});

	it('/v3/covid-19/vaccine/coverage/states/non_existent_state incorrect state name', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccine/coverage/states/non_existent_state')
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res);
				testBasicProperties(err, res, 404, 'object');
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				done();
			});
	});

	// Ensures correct state vaccine data is retrieved using state name
	it(`/v3/covid-19/vaccine/coverage/states/Illinois correct state name`, (done) => {
		chai.request(app)
			.get(`/v3/covid-19/vaccine/coverage/states/Illinois`)
			.end((err, res) => {
				should.not.exist(err);
				should.exist(res);
				if (res.status === 200) {
					res.body.should.be.a('object');
					res.body.should.have.property('state');
					res.body.should.have.property('timeline');
					Object.keys(res.body.timeline).length.should.equal(30);
				} else {
					res.body.should.be.a('object');
					res.body.should.have.property('message');
				}
				done();
			});
	});
});
