var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('TESTING /countries', () => {
    it('/countries', (done) => {
        chai.request(app)
            .get('/countries')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/countries/usa', (done) => {
        chai.request(app)
            .get('/countries/usa')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/united%20states', (done) => {
        chai.request(app)
            .get('/countries/united%20states')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/us', (done) => {
        chai.request(app)
            .get('/countries/us')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/840', (done) => {
        chai.request(app)
            .get('/countries/840')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/uk', (done) => {
        chai.request(app)
            .get('/countries/uk')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('UK');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/diamond%20princess', (done) => {
        chai.request(app)
            .get('/countries/diamond%20princess')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/asdfghjkl', (done) => {
        chai.request(app)
            .get('/countries/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/all', (done) => {
        chai.request(app)
            .get('/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/states', (done) => {
        chai.request(app)
            .get('/states')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/yesterday', (done) => {
        chai.request(app)
            .get('/yesterday')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});