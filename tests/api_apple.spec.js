const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('TESTING /v2/apple/countries', () => {
    it('/v2/apple/countries correct type', (done) => {
        chai.request(app)
            .get('/v2/apple/countries')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);
                done();
            });
    });
});

describe('TESTING /v2/apple/countries/country', () => {
    it('/v2/apple/countries/country correct for all valid', (done) => {
        chai.request(app)
            .get('/v2/apple/countries')
            .end((err, res) => {
                should.not.exist(err);
				should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.map((countryName) => {
                    chai.request(app)
					    .get(`/v2/apple/countries/${countryName}`)
					    .end((err2, res2) => {
                            should.not.exist(err2);
						    should.exist(res2);
                            res2.should.have.status(200);
                            res2.body.should.have.property('country').eql(countryName);
                            res2.body.should.have.property('subregions');
                            res2.body.subregions.length.should.be.at.least(1);
                        });
                });
                done();
            });
    });

    it('/v2/apple/countries/country correct for invalid country', (done) => {
        chai.request(app)
            .get('/v2/apple/countries/agfdsdh')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res2.body.should.have.property('message');
                done();
            });
    });
});