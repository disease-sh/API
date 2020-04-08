var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('TESTING /jhucsse and /v2/jhucsse', () => {
    it('/jhucsse', (done) => {
        chai.request(app)
            .get('/jhucsse')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/jhucsse', (done) => {
        chai.request(app)
            .get('/v2/jhucsse')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/jhucsse/counties', (done) => {
        chai.request(app)
            .get('/v2/jhucsse/counties')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/jhucsse/counties incorrect county name', (done) => {
        chai.request(app)
            .get('/v2/jhucsse/counties/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/jhucsse/counties/ multiple correct county names', (done) => {
        chai.request(app)
            .get('/v2/jhucsse/counties/cook|acadia')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('cook');
                res.body.should.have.property('acadia');
                done();
            });
    });

    it('/v2/jhucsse/counties/ incorrect and correct county names', (done) => {
        chai.request(app)
            .get('/v2/jhucsse/counties/cook|fggdfg')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('cook');
                done();
            });
    });
});