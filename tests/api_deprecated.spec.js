var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

before(done => {
    app.on('scrapper_finished', function () {
        console.log('Scrapper Finished...');
        done();
    });
});

describe('TESTING DEPRECATED METHODS', () => {
    it('Testing /historical', (done) => {
        chai.request(app)
            .get('/historical')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/historical' });
                done();
            });
    });

    it('Testing /historical/:country', (done) => {
        chai.request(app)
            .get('/historical/tescountry')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({ message: 'Deprecated, use /v2/historical' });
                done();
            });
    });
});