const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

before(done => app.on('scrapper_finished', () => done()));

describe('TESTING DEPRECATED METHODS', () => {
    it('Testing /historical', (done) => {
        chai.request(app)
            .get('/historical')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/historical' });
                done();
            });
    });

    it('Testing /historical/:country', (done) => {
        chai.request(app)
            .get('/historical/testcountry')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/historical' });
                done();
            });
    });

    it('Testing /jhucsse/', (done) => {
        chai.request(app)
            .get('/jhucsse')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/jhucsse' });
                done();
            });
    });

    it('Testing /all/', (done) => {
        chai.request(app)
            .get('/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/all' });
                done();
            });
    });

    it('Testing /countries/', (done) => {
        chai.request(app)
            .get('/countries')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/countries' });
                done();
            });
    });

    it('Testing /countries/:query', (done) => {
        chai.request(app)
            .get('/countries/usa')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/countries' });
                done();
            });
    });

    it('Testing /states/', (done) => {
        chai.request(app)
            .get('/states')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/states' });
                done();
            });
    });

    it('Testing /yesterday/', (done) => {
        chai.request(app)
            .get('/yesterday')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/countries?yesterday=true' });
                done();
            });
    });

    it('Testing /yesterday/all', (done) => {
        chai.request(app)
            .get('/yesterday/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/all?yesterday=true' });
                done();
            });
    });

    it('Testing /yesterday/:query', (done) => {
        chai.request(app)
            .get('/yesterday/usa')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/countries?yesterday=true' });
                done();
            });
    });
});