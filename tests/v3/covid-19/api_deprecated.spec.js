/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

describe('TESTING DEPRECATED METHODS', () => {
	it('Testing /historical', (done) => {
		chai.request(app)
			.get('/historical')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /historical/:country', (done) => {
		chai.request(app)
			.get('/historical/testcountry')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /jhucsse/', (done) => {
		chai.request(app)
			.get('/jhucsse')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /all/', (done) => {
		chai.request(app)
			.get('/all')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /countries/', (done) => {
		chai.request(app)
			.get('/countries')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /countries/:query', (done) => {
		chai.request(app)
			.get('/countries/usa')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /states/', (done) => {
		chai.request(app)
			.get('/states')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /yesterday/', (done) => {
		chai.request(app)
			.get('/yesterday')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /yesterday/all', (done) => {
		chai.request(app)
			.get('/yesterday/all')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});

	it('Testing /yesterday/:query', (done) => {
		chai.request(app)
			.get('/yesterday/usa')
			.end((err, res) => {
				testBasicProperties(err, res, 410, 'object');
				res.body.should.have.property('message');
				res.body.should.have.property('docs');
				done();
			});
	});
});
