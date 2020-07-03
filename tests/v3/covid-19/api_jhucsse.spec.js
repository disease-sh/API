/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v3/covid-19/jhucsse', () => {
	it('/v3/covid-19/jhucsse', (done) => {
		chai.request(app)
			.get('/v3/covid-19/jhucsse')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v3/covid-19/jhucsse/counties', (done) => {
		chai.request(app)
			.get('/v3/covid-19/jhucsse/counties')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v3/covid-19/jhucsse/counties incorrect county name', (done) => {
		chai.request(app)
			.get('/v3/covid-19/jhucsse/counties/asdfghjkl')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				done();
			});
	});

	it('/v3/covid-19/jhucsse/counties/ multiple correct county names', (done) => {
		chai.request(app)
			.get('/v3/covid-19/jhucsse/counties/cook|acadia')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cook');
				res.body.should.have.property('acadia');
				done();
			});
	});

	it('/v3/covid-19/jhucsse/counties/ incorrect and correct county names', (done) => {
		chai.request(app)
			.get('/v3/covid-19/jhucsse/counties/cook|fggdfg')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cook');
				done();
			});
	});
});
