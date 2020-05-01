const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('TESTING /v2/apple/countries', () => {
    it('/v2/apple/countries correct type', (done) => {
        chai.request(app)
            .get('/v2/apple/countries')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);
                done();
            })
    });
});