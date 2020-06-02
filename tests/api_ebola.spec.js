const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { testBasicProperties } = require('./testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v2/ebola general', () => {
    it('/v2/ebola correct properties', (done) => {
		chai.request(app)
			.get('/v2/ebola')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
                res.body.should.have.property('updated');
                res.body.should.have.property('source');
                res.body.should.have.property('provinces');
				done();
			});
    });
    
    it('/v2/ebola provinces filled', (done) => {
		chai.request(app)
			.get('/v2/ebola')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
                res.body.should.have.property('provinces');
                res.body.provinces.length.should.be.at.least(1);
				done();
			});
	});
});