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
});