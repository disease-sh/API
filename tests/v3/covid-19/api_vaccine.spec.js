/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v3/covid-19/vaccine', () => {
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
				res.body.data.forEach(element => {
					element.should.have.property('candidate');
					element.should.have.property('sponsors');
					element.should.have.property('details');
					element.should.have.property('trialPhase');
					element.should.have.property('institutions');
					element.should.have.property('funding');
				});
				done();
			});
	});
});
