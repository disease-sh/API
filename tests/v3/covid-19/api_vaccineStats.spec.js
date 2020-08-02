/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v3/covid-19/vaccineStats', () => {
	it('/v3/covid-19/vaccineStats correct type', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccineStats')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.phases.length.should.be.at.least(1);
				done();
			});
	});
	it('/v3/covid-19/vaccineStats correct attributes', (done) => {
		chai.request(app)
			.get('/v3/covid-19/vaccineStats')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('totalCandidates')
				res.body.should.have.property('phases')
				done();
			});
	});
});
