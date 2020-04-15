const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('TESTING /nyt/states', () => {
    it('/nyt/states', (done) => {
        chai.request(app)
            .get('/nyt/states')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    })

    it('/nyt/states get correct state', (done) => {
        chai.request(app)
            .get('/nyt/states?state=California')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                res.body[0].should.have.property('state').equal('California');
                done();
            })
    })

    it('/nyt/states get incorrect state name', (done) => {
        chai.request(app)
            .get('/nyt/states?state=DoesntExist')
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

describe('TESTING /counties', (done) => {
    it('/nyt/counties', (done) => {
        chai.request(app)
            .get('/nyt/counties')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/nyt/counties get correct county', (done) => {
        chai.request(app)
            .get('/nyt/counties?county=Alameda')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.a('array');
                res.body[0].should.have.property('county').equal('Alameda');
                done();
            });
    });

    it('/nyt/counties get incorrect county name', (done) => {
        chai.request(app)
            .get('/nyt/counties?county=DoesntExist')
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

describe('TESTING /nyt/nation_wide', () => {
    it('/nyt/nation_wide', (done) => {
        chai.request(app)
            .get('/nyt/nation_wide')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    })
});