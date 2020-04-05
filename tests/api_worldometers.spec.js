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

    it('/yesterday', (done) => {
        chai.request(app)
            .get('/yesterday')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/yesterday?sort works', (done) => {
        chai.request(app)
            .get('/yesterday?sort=cases')
            .end((err, res) => {
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    element.cases <= maxCases;
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });

    it('/yesterday/country works', (done) => {
        chai.request(app)
            .get('/yesterday/China')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/country works id', (done) => {
        chai.request(app)
            .get('/yesterday/156')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/country works iso', (done) => {
        chai.request(app)
            .get('/yesterday/chn')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/country incorrect name', (done) => {
        chai.request(app)
            .get('/yesterday/fsih8475gife')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/yesterday/countrylist works', (done) => {
        chai.request(app)
            .get('/yesterday/156,america, brA')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(3);
                res.body[0].country.should.equal('China');
                res.body[1].country.should.equal('USA');
                res.body[2].country.should.equal('Brazil');
                done();
            });
    });

    it('/yesterday/countrylist with incorrect name', (done) => {
        chai.request(app)
            .get('/yesterday/156,fhligu')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/countrylist with incorrect names', (done) => {
        chai.request(app)
            .get('/yesterday/156,fhligu, gsiugshg, usa')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(2);
                res.body[0].country.should.equal('China');
                res.body[1].country.should.equal('USA');
                done();
            });
    });
});