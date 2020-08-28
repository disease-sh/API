/* eslint-disable no-undef, no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const { testBasicProperties } = require('../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v2/nyt/states', () => {
	it('/v2/nyt/states', (done) => {
		chai.request(app)
			.get('/v2/nyt/states')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/nyt/states lastdays check test case', (done) => {
		chai.request(app)
			.get('/v2/nyt/states?lastdays=2')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body).length.should.greaterThan(50);
				Object.keys(res.body).length.should.lessThan(120);
				done();
			});
	});

	it('/v2/nyt/states lastdays check test case and correct state', (done) => {
		chai.request(app)
			.get('/v2/nyt/states/Washington?lastdays=2')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body).length.should.greaterThan(0);
				Object.keys(res.body).length.should.lessThan(3);
				done();
			});
	});

	it('/v2/nyt/states get correct state', (done) => {
		chai.request(app)
			.get('/v2/nyt/states/California')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body[0].should.have.property('state').equal('California');
				done();
			});
	});

	it('/v2/nyt/states get correct state lowercase', (done) => {
		chai.request(app)
			.get('/v2/nyt/states/cAlifornia')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body[0].should.have.property('state').equal('California');
				done();
			});
	});

	it('/v2/nyt/states get incorrect state name', (done) => {
		chai.request(app)
			.get('/v2/nyt/states/DoesntExist')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/nyt/states multiple correct states', (done) => {
		chai.request(app)
			.get('/v2/nyt/states/illinois, california')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				const illinoisFound = res.body.some((entry) => entry.state === 'Illinois'),
					californiaFound = res.body.some((entry) => entry.state === 'California');
				(illinoisFound && californiaFound).should.be.true;
				done();
			});
	});

	it('/v2/nyt/states partial incorrect states', (done) => {
		chai.request(app)
			.get('/v2/nyt/states/illinois, incorrect')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				const illinoisFound = res.body.some((entry) => entry.state === 'Illinois');
				illinoisFound.should.be.true;
				done();
			});
	});
});

describe('TESTING /v2/nyt/counties', () => {
	it('/v2/nyt/counties', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/nyt/counties default lastdays = 30 default', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body).length.should.greaterThan(90000);
				Object.keys(res.body).length.should.lessThan(100000);
				done();
			});
	});

	it('/v2/nyt/counties lastdays = 2 param', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties?lastdays=2')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body).length.should.greaterThan(3000);
				Object.keys(res.body).length.should.lessThan(10000);
				done();
			});
	});

	it('/v2/nyt/counties lastdays check test case and correct county', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties/Blount?lastdays=2')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body).length.should.greaterThan(1);
				done();
			});
	});

	it('/v2/nyt/counties get correct county', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties/Alameda')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body[0].should.have.property('county').equal('Alameda');
				done();
			});
	});

	it('/v2/nyt/counties get correct county lowercase', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties/aLamEda')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body[0].should.have.property('county').equal('Alameda');
				done();
			});
	});

	it('/v2/nyt/counties multiple correct counties', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties/aLamEda, cook')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				const cookFound = res.body.some((entry) => entry.county === 'Cook'),
					alamedaFound = res.body.some((entry) => entry.county === 'Alameda');
				(cookFound && alamedaFound).should.be.true;
				done();
			});
	});

	it('/v2/nyt/counties partial incorrect counties', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties/incorrect, cook')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				const cookFound = res.body.some((entry) => entry.county === 'Cook');
				cookFound.should.be.true;
				done();
			});
	});

	it('/v2/nyt/counties get incorrect county name', (done) => {
		chai.request(app)
			.get('/v2/nyt/counties/DoesntExist')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});
});

describe('TESTING /v2/nyt/usa', () => {
	it('/v2/nyt/usa', (done) => {
		chai.request(app)
			.get('/v2/nyt/usa')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});
});
