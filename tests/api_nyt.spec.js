const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('TESTING /v2/nyt/states', () => {
    it('/v2/nyt/states', (done) => {
        chai.request(app)
            .get('/v2/nyt/states')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    });

    it('/v2/nyt/states get correct state', (done) => {
        chai.request(app)
            .get('/v2/nyt/states/California')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                res.body[0].should.have.property('state').equal('California');
                done();
            })
    });

    it('/v2/nyt/states get correct state lowercase', (done) => {
        chai.request(app)
            .get('/v2/nyt/states/cAlifornia')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                res.body[0].should.have.property('state').equal('California');
                done();
            })
    });

    it('/v2/nyt/states get incorrect state name', (done) => {
        chai.request(app)
            .get('/v2/nyt/states/DoesntExist')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v2/nyt/states multiple correct states', (done) => {
        chai.request(app)
            .get('/v2/nyt/states/illinois,california')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                let illinoisFound = false, californiaFound = false;
                res.body.map((entry) => {
                    if (entry.county === 'Illinois') illinoisFound = illinoisFound || true;
                    if (entry.county === 'California') californiaFound = californiaFound || true;
                });
                (illinoisFound && californiaFound).should.equal(true);
                done();
            });
    });

    it('/v2/nyt/states partial incorrect states', (done) => {
        chai.request(app)
            .get('/v2/nyt/states/illinois,incorrect')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                let illinoisFound = false;
                res.body.map((entry) => {
                    if (entry.county === 'Illinois') illinoisFound = illinoisFound || true;
                });
                (illinoisFound).should.equal(true);
                done();
            });
    });
});

describe('TESTING /v2/counties', (done) => {
    it('/v2/nyt/counties', (done) => {
        chai.request(app)
            .get('/v2/nyt/counties')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/nyt/counties get correct county', (done) => {
        chai.request(app)
            .get('/v2/nyt/counties/Alameda')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                res.body[0].should.have.property('county').equal('Alameda');
                done();
            });
    });

    it('/v2/nyt/counties get correct county lowercase', (done) => {
        chai.request(app)
            .get('/v2/nyt/counties/aLamEda')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                res.body[0].should.have.property('county').equal('Alameda');
                done();
            });
    });

    it('/v2/nyt/counties multiple correct counties', (done) => {
        chai.request(app)
            .get('/v2/nyt/counties/aLamEda,cook')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                let cookFound = false, alamedaFound = false;
                res.body.map((entry) => {
                    if (entry.county === 'Cook') cookFound = cookFound || true;
                    if (entry.county === 'Alameda') alamedaFound = alamedaFound || true;
                });
                (cookFound && alamedaFound).should.equal(true);
                done();
            });
    });

    it('/v2/nyt/counties partial incorrect counties', (done) => {
        chai.request(app)
            .get('/v2/nyt/counties/incorrect,cook')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                let cookFound = false;
                res.body.map((entry) => {
                    if (entry.county === 'Cook') cookFound = cookFound || true;
                });
                cookFound.should.equal(true);
                done();
            });
    });

    it('/v2/nyt/counties get incorrect county name', (done) => {
        chai.request(app)
            .get('/v2/nyt/counties/DoesntExist')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
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
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    })
});