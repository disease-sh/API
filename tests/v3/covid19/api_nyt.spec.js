const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

describe('TESTING /v3/covid-19/nyt/states', () => {
    it('/v3/covid-19/nyt/states', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/states')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                done();
            })
    });

    it('/v3/covid-19/nyt/states get correct state', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/states/California')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                res.body[0].should.have.property('state').equal('California');
                done();
            })
    });

    it('/v3/covid-19/nyt/states get correct state lowercase', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/states/cAlifornia')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                res.body[0].should.have.property('state').equal('California');
                done();
            })
    });

    it('/v3/covid-19/nyt/states get incorrect state name', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/states/DoesntExist')
            .end((err, res) => {
                testBasicProperties(err, res, 404, 'object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v3/covid-19/nyt/states multiple correct states', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/states/illinois, california')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                let illinoisFound = false, californiaFound = false;
                res.body.map((entry) => {
                    if (entry.state === 'Illinois') illinoisFound = illinoisFound || true;
                    if (entry.state === 'California') californiaFound = californiaFound || true;
                });
                (illinoisFound && californiaFound).should.equal(true);
                done();
            });
    });

    it('/v3/covid-19/nyt/states partial incorrect states', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/states/illinois, incorrect')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                let illinoisFound = false;
                res.body.map((entry) => {
                    if (entry.state === 'Illinois') illinoisFound = illinoisFound || true;
                });
                (illinoisFound).should.equal(true);
                done();
            });
    });
});

describe('TESTING /v3/covid-19/nyt/counties', (done) => {
    it('/v3/covid-19/nyt/counties', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/counties')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                done();
            });
    });

    it('/v3/covid-19/nyt/counties get correct county', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/counties/Alameda')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                res.body[0].should.have.property('county').equal('Alameda');
                done();
            });
    });

    it('/v3/covid-19/nyt/counties get correct county lowercase', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/counties/aLamEda')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                res.body[0].should.have.property('county').equal('Alameda');
                done();
            });
    });

    it('/v3/covid-19/nyt/counties multiple correct counties', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/counties/aLamEda, cook')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                let cookFound = false, alamedaFound = false;
                res.body.map((entry) => {
                    if (entry.county === 'Cook') cookFound = cookFound || true;
                    if (entry.county === 'Alameda') alamedaFound = alamedaFound || true;
                });
                (cookFound && alamedaFound).should.equal(true);
                done();
            });
    });

    it('/v3/covid-19/nyt/counties partial incorrect counties', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/counties/incorrect, cook')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                let cookFound = false;
                res.body.map((entry) => {
                    if (entry.county === 'Cook') cookFound = cookFound || true;
                });
                cookFound.should.equal(true);
                done();
            });
    });

    it('/v3/covid-19/nyt/counties get incorrect county name', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/counties/DoesntExist')
            .end((err, res) => {
                testBasicProperties(err, res, 404, 'object');
                res.body.should.have.property('message');
                done();
            });
    });
});

describe('TESTING /v3/covid-19/nyt/usa', () => {
    it('/v3/covid-19/nyt/usa', (done) => {
        chai.request(app)
            .get('/v3/covid-19/nyt/usa')
            .end((err, res) => {
                testBasicProperties(err, res, 200, 'array');
                done();
            });
    })
});