const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

const countries = ['Austria', 'Canada', 'Italy', 'Germany'].sort();

describe('TESTING /v2/gov general', () => {
    it('/v2/gov correct countries', (done) => {
        chai.request(app)
            .get('/v2/gov')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);
                res.body.sort().forEach((country, index) => {
                    country.should.equal(countries[index]);
                });
                done();
            });
    });

    it('/v2/gov/countries invalid country', (done) => {
        chai.request(app)
            .get('/v2/gov/fsdgdshgabv')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.have.property('message');
                done();
            });
    });
});

describe('TESTING /v2/gov/canada', () => {
    it('/v2/gov/canada correct amount of provinces', (done) => {
        chai.request(app)
            .get('/v2/gov/canada')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(15);
                done();
            });
    });

    it('/v2/gov/canada correct fields set', (done) => {
        chai.request(app)
            .get('/v2/gov/canada')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach((element) => {
                    element.should.have.property('updated');
                    element.should.have.property('province');
                    element.should.have.property('cases');
                    element.cases.should.be.at.least(0);
                    element.should.have.property('probableCases');
                    element.probableCases.should.be.at.least(0);
                    element.should.have.property('deaths');
                    element.deaths.should.be.at.least(0);
                });
                done();
            });
    });
});

describe('TESTING /v2/gov/italy', () => {
    it('/v2/gov/italy correct amount of provinces', (done) => {
        chai.request(app)
            .get('/v2/gov/italy')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(21);
                done();
            });
    });

    it('/v2/gov/italy correct fields set', (done) => {
        chai.request(app)
            .get('/v2/gov/italy')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach((element) => {
                    element.should.have.property('updated');
                    element.should.have.property('region');
                    element.should.have.property('lat');
                    element.should.have.property('long');
                    element.should.have.property('hospitalizedWithSymptoms');
                    element.hospitalizedWithSymptoms.should.be.at.least(0);
                    element.should.have.property('intensiveCare');
                    element.intensiveCare.should.be.at.least(0);
                    element.should.have.property('totalHospitalized');
                    element.totalHospitalized.should.be.at.least(0);
                    element.should.have.property('homeIsolation');
                    element.homeIsolation.should.be.at.least(0);
                    element.should.have.property('newCases');
                    element.newCases.should.be.at.least(0);
                    element.should.have.property('totalCases');
                    element.totalCases.should.be.at.least(0);
                    element.should.have.property('recovered');
                    element.recovered.should.be.at.least(0);
                    element.should.have.property('deaths');
                    element.deaths.should.be.at.least(0);
                });
                done();
            });
    });
});

describe('TESTING /v2/gov/germany', () => {
    it('/v2/gov/germany correct amount of provinces', (done) => {
        chai.request(app)
            .get('/v2/gov/germany')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(17);
                done();
            });
    });

    it('/v2/gov/germany correct fields set', (done) => {
        chai.request(app)
            .get('/v2/gov/germany')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach((element) => {
                    element.should.have.property('updated');
                    element.should.have.property('province');
                    element.should.have.property('cases');
                    element.cases.should.be.at.least(0);
                    element.should.have.property('casePreviousDayChange');
                    element.should.have.property('casesPerHundredThousand');
                    element.casesPerHundredThousand.should.be.at.least(0);
                    element.should.have.property('deaths');
                    element.deaths.should.be.at.least(0);
                });
                done();
            });
    });
});

describe('TESTING /v2/gov/austria', () => {
    it('/v2/gov/austria correct properties', (done) => {
        chai.request(app)
            .get('/v2/gov/austria')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('provinces');
                res.body.should.have.property('districts');
                res.body.should.have.property('percentageBySex');
                res.body.should.have.property('casesByAge');
                res.body.should.have.property('updated');
                done();
            });
    });

    it('/v2/gov/austria correct province properties', (done) => {
        chai.request(app)
            .get('/v2/gov/austria')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('provinces');
                res.body.districts.should.be.a('array');
                res.body.provinces.forEach((element) => {
                    element.should.have.property('province');
                    element.should.have.property('cases');
                });
                done();
            });
    });

    it('/v2/gov/austria correct district properties', (done) => {
        chai.request(app)
            .get('/v2/gov/austria')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('districts');
                res.body.districts.should.be.a('array');
                res.body.districts.forEach((element) => {
                    element.should.have.property('district');
                    element.should.have.property('cases');
                    element.should.have.property('population');
                });
                done();
            });
    });

    it('/v2/gov/austria correct percentageBySex properties', (done) => {
        chai.request(app)
            .get('/v2/gov/austria')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('percentageBySex');
                res.body.percentageBySex.should.have.property('male')
                res.body.percentageBySex.should.have.property('female')
                done();
            });
    });

    it('/v2/gov/austria correct casesByAge properties', (done) => {
        chai.request(app)
            .get('/v2/gov/austria')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('casesByAge');
                done();
            });
    });
});
