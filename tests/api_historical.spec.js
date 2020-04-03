var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('TESTING /v2/historical', () => {
    it('/v2/historical', (done) => {
        chai.request(app)
            .get('/v2/historical')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/historical/all', (done) => {
        chai.request(app)
            .get('/v2/historical/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/historical/usa', (done) => {
        chai.request(app)
            .get('/v2/historical/usa')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/historical/diamond%20princess', (done) => {
        chai.request(app)
            .get('/v2/historical/diamond%20princess')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/historical/asdfghjkl', (done) => {
        chai.request(app)
            .get('/v2/historical/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });
});