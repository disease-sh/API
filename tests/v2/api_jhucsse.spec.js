/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const { testBasicProperties } = require('../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v2/jhucsse', () => {
	it('/v2/jhucsse', (done) => {
		chai.request(app)
			.get('/v2/jhucsse')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/jhucsse/counties', (done) => {
		chai.request(app)
			.get('/v2/jhucsse/counties')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/jhucsse/counties incorrect county name', (done) => {
		chai.request(app)
			.get('/v2/jhucsse/counties/asdfghjkl')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				done();
			});
	});

	it('/v2/jhucsse/counties/ multiple correct county names', (done) => {
		chai.request(app)
			.get('/v2/jhucsse/counties/cook|acadia')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cook');
				res.body.should.have.property('acadia');
				done();
			});
	});

	it('/v2/jhucsse/counties/ incorrect and correct county names', (done) => {
		chai.request(app)
			.get('/v2/jhucsse/counties/cook|fggdfg')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('cook');
				done();
			});
	});
});
