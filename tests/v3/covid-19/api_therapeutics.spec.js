/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

describe.skip('TESTING /v3/covid-19/therapeutics', () => {
	it('/v3/covid-19/therapeutics correct type', (done) => {
		chai.request(app)
			.get('/v3/covid-19/therapeutics')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.data.length.should.be.at.least(1);
				done();
			});
	});
	it('/v3/covid-19/therapeutics correct attributes', (done) => {
		chai.request(app)
			.get('/v3/covid-19/therapeutics')
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
					element.should.have.property('medicationClass');
					element.should.have.property('tradeName');
					element.should.have.property('details');
					element.should.have.property('developerResearcher');
					element.should.have.property('sponsors');
					element.should.have.property('trialPhase');
					element.should.have.property('lastUpdate');
				});
				done();
			});
	});
});
