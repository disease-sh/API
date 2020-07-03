/* eslint-disable no-undef, max-nested-callbacks */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../server');
const countryData = require('../../utils/countries');
const { testBasicProperties } = require('../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v2/historical', () => {
	it('/v2/historical', (done) => {
		chai.request(app)
			.get('/v2/historical')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/historical/all', (done) => {
		chai.request(app)
			.get('/v2/historical/all')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				done();
			});
	});

	it('/v2/historical/all lastdays param', (done) => {
		chai.request(app)
			.get('/v2/historical/all?lastdays=15')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				Object.keys(res.body.cases).length.should.equal(15);
				done();
			});
	});

	it('/v2/historical/ correct number default dates', (done) => {
		chai.request(app)
			.get('/v2/historical')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body[0].timeline.cases).length.should.equal(30);
				done();
			});
	});

	it('/v2/historical/ handles bad date string', (done) => {
		chai.request(app)
			.get('/v2/historical?lastday=rgf3vwre')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body[0].timeline.cases).length.should.equal(30);
				done();
			});
	});

	it('/v2/historical/ correct number specified dates', (done) => {
		chai.request(app)
			.get('/v2/historical?lastdays=15')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body[0].timeline.cases).length.should.equal(15);
				done();
			});
	});

	it('/v2/historical/usa?lastdays=all correct first date', (done) => {
		chai.request(app)
			.get('/v2/historical/usa?lastdays=all')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				Object.keys(res.body.timeline.cases)[0].should.equal('1/22/20');
				done();
			});
	});

	it('/v2/historical/diamond%20princess', (done) => {
		chai.request(app)
			.get('/v2/historical/diamond%20princess')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				done();
			});
	});

	it('/v2/historical/ incorrect country name', (done) => {
		chai.request(app)
			.get('/v2/historical/asdfghjkl')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/historical/ correct country name list', (done) => {
		chai.request(app)
			.get('/v2/historical/usa, 156, drc')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/historical/ incorrect province name list', (done) => {
		chai.request(app)
			.get('/v2/historical/usa/sdgdf,gsfd')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body[0].should.have.property('message');
				done();
			});
	});

	it('/v2/historical/ correct province name list', (done) => {
		chai.request(app)
			.get('/v2/historical/156/bejing,hubei')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/historical/ correct province name list split', (done) => {
		chai.request(app)
			.get('/v2/historical/nl/aruba|mainland|bonaire, sint eustatius and saba')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(3);
				res.body[2].should.have.property('country');
				done();
			});
	});

	it('/v2/historical/ correct country name given province', (done) => {
		chai.request(app)
			.get('/v2/historical/gbr/mainland')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.country.should.equal('UK');
				res.body.province.should.equal('mainland');
				done();
			});
	});

	// Test that all countries map to their respective country
	countryData.forEach((element) => {
		it(`/v2/historical/${element.country} correct country name`, (done) => {
			chai.request(app)
				.get(`/v2/historical/${element.country}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(element.country);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	// Test that all country iso2 codes map to their respective country
	countryData.forEach((element) => {
		it(`/v2/historical/${element.iso2} correct country name`, (done) => {
			chai.request(app)
				.get(`/v2/historical/${element.iso2}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(element.country);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	// Test that all country iso3 codes map to their respective country
	countryData.forEach((element) => {
		it(`/v2/historical/${element.iso3} correct country name`, (done) => {
			chai.request(app)
				.get(`/v2/historical/${element.iso3}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(element.country);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	// Test that all country ids map to their respective country
	countryData.forEach((element) => {
		it(`/v2/historical/${element.id} correct country name`, (done) => {
			chai.request(app)
				.get(`/v2/historical/${element.id}`)
				.end((err, res) => {
					should.not.exist(err);
					should.exist(res);
					if (res.status === 200) {
						res.body.should.be.a('object');
						res.body.country.should.equal(element.country);
					} else {
						res.body.should.be.a('object');
						res.body.should.have.property('message');
					}
					done();
				});
		});
	});

	it('/v2/historical/usacounties correct response', (done) => {
		chai.request(app)
			.get('/v2/historical/usacounties')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				done();
			});
	});

	it('/v2/historical/usacounties incorrect state name', (done) => {
		chai.request(app)
			.get('/v2/historical/usacounties/sdfgw3')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});

	it('/v2/historical/usacounties/illinois correct number specified dates', (done) => {
		chai.request(app)
			.get('/v2/historical/usacounties/illinois?lastdays=15')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				Object.keys(res.body[0].timeline.cases).length.should.equal(15);
				done();
			});
	});

	it('/v2/historical/usacounties/state correct response all states', (done) => {
		chai.request(app)
			.get('/v2/historical/usacounties')
			.end((err, states) => {
				testBasicProperties(err, states, 200, 'array');
				states.body.forEach((state) => {
					chai.request(app)
						.get(`/v2/historical/usacounties/${state}`)
						.end((err2, res) => {
							should.not.exist(err);
							should.exist(res);
							res.should.have.status(200);
							res.body.should.be.a('array');
							res.body[0].province.should.equal(state);
						});
				});
				done();
			});
	});
});
