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

    it('/v2/jhucsse/counties/asdfghjkl', (done) => {
        chai.request(app)
            .get('/v2/jhucsse/counties/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
});