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

    it('/countries/ get correct properties', (done) => {
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

    it('/countries/ get correct alternate name', (done) => {
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

    it('/countries/ get correct ios2', (done) => {
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

    it('/countries/ get correct id', (done) => {
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

    it('/countries/ get incorrect country name', (done) => {
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

    it('/all has correct properties', (done) => {
        chai.request(app)
            .get('/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('affectedCountries');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
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
    
    it('/states/ get correct properties', (done) => {
        chai.request(app)
            .get('/states/alabama')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('state').eql('Alabama');
                res.body.should.have.property('cases');
                done();
            });
    });
    
    it('/states/ get incorrect state name', (done) => {
        chai.request(app)
            .get('/states/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
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
