const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const countryData = require('../utils/countries');
const should = chai.should();
chai.use(chaiHttp);

describe('TESTING /v2/continents', () => {
    it('/v2/continents', (done) => {
        chai.request(app)
            .get('/v2/continents')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/continents/ get correct properties', (done) => {
        chai.request(app)
            .get('/v2/continents/europe')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('continent').eql('Europe');
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('updated');
                res.body.should.have.property('critical');
                res.body.should.have.property('recovered');
                res.body.should.have.property('active');
                done();
            });
    });

    it('/v2/continents/ fuzzy search', (done) => {
        chai.request(app)
            .get('/v2/continents/euro?strict=false')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('continent').eql('Europe');
                done();
            });
    });

    it('/v2/continents/ get incorrect continent name', (done) => {
        chai.request(app)
            .get('/v2/continents/asdfghjkl')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v2/continents?sort works', (done) => {
        chai.request(app)
            .get('/v2/continents?sort=cases')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });
});

describe('TESTING /countries', () => {
    it('/countries', (done) => {
        chai.request(app)
            .get('/countries')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/countries/ get correct properties', (done) => {
        chai.request(app)
            .get('/countries/usa')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/countries/ get correct alternate name', (done) => {
        chai.request(app)
            .get('/countries/united%20states')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/countries/netherlands gives Netherlands', (done) => {
        chai.request(app)
        .get('/countries/netherlands')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Netherlands');
            done();
        });
    });

    it('/countries/sudan gives Sudan', (done) => {
        chai.request(app)
        .get('/countries/sudan')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Sudan');
            done();
        });
    });

    it('/countries/guinea gives Guinea', (done) => {
        chai.request(app)
        .get('/countries/guinea')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Guinea');
            done();
        });
    });

    it('/all', (done) => {
        chai.request(app)
            .get('/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/all has correct properties', (done) => {
        chai.request(app)
            .get('/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/states?sort works', (done) => {
        chai.request(app)
            .get('/states?sort=cases')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });

    it('/states?sort bad param', (done) => {
        chai.request(app)
            .get('/states?sort=gsdfb325fsd')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/states/state works', (done) => {
        chai.request(app)
            .get('/states/Illinois')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.state.should.equal("Illinois");
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('active');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/states/state1,state2', (done) => {
        chai.request(app)
            .get('/states/Illinois,New%20York')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (var row of res.body) {
                    row.should.have.property('cases');
                    row.should.have.property('todayCases');
                    row.should.have.property('deaths');
                    row.should.have.property('todayDeaths');
                    row.should.have.property('active');
                    row.should.have.property('tests');
                    row.should.have.property('testsPerOneMillion');
                }
                done();
            });
    });

    it('/states/ get incorrect state name', (done) => {
        chai.request(app)
            .get('/states/asdfghjkl')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/yesterday/all', (done) => {
        chai.request(app)
            .get('/yesterday/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/yesterday/all has correct properties', (done) => {
        chai.request(app)
            .get('/yesterday/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('affectedCountries');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/yesterday/all is less than countries/all', (done) => {
        chai.request(app)
            .get('/yesterday/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                chai.request(app)
                    .get('/all')
                    .end((err2, res2) => {
                        should.not.exist(err2);
                        should.exist(res2);
                        res2.should.have.status(200);
                        res2.body.cases.should.be.at.least(res.body.cases);
                        done();
                    });
            });
    });

    it('/yesterday/us has correct properties', (done) => {
        chai.request(app)
            .get('/yesterday/us')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/yesterday?sort works', (done) => {
        chai.request(app)
            .get('/yesterday?sort=cases')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
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
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(2);
                res.body[0].country.should.equal('China');
                res.body[1].country.should.equal('USA');
                done();
            });
    });

    it('/yesterday/netherlands gives Caribbean Netherlands', (done) => {
        chai.request(app)
        .get('/yesterday/netherlands')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Caribbean Netherlands');
            done();
        });
    });

    it('/yesterday/sudan gives South Sudan', (done) => {
        chai.request(app)
        .get('/yesterday/sudan')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('South Sudan');
            done();
        });
    });

    it('/yesterday/guinea gives Equatorial Guinea', (done) => {
        chai.request(app)
        .get('/yesterday/guinea')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Equatorial Guinea');
            done();
        });
    });

    // Test that all countries map to their respective country
    countryData.map((element) => {
        it(`/countries/${element.country}?strict=true correct country name`, (done) => {
            chai.request(app)
                .get(`/countries/${element.country}?strict=true`)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    if (res.status === 200) {
                        res.body.should.be.a('object');
                        res.body.country.should.equal(element.country.replace(/'/g, "\""));
                        res.body.should.have.property('cases');
                        res.body.should.have.property('todayCases');
                        res.body.should.have.property('deaths');
                        res.body.should.have.property('todayDeaths');
                        res.body.should.have.property('casesPerOneMillion');
                        res.body.should.have.property('updated');
                        res.body.should.have.property('tests');
                        res.body.should.have.property('testsPerOneMillion');
                    }
                    else {
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                    }
                    done();
                });
        });
    });

    // Test that all yesterday datas map to their respective country
    countryData.map((element) => {
        it(`/yesterday/${element.country}?strict=true correct country name`, (done) => {
            chai.request(app)
                .get(`/yesterday/${element.country}?strict=true`)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    if (res.status === 200) {
                        res.body.should.be.a('object');
                        res.body.country.should.equal(element.country.replace(/'/g, "\""));
                        res.body.should.have.property('cases');
                        res.body.should.have.property('todayCases');
                        res.body.should.have.property('deaths');
                        res.body.should.have.property('todayDeaths');
                        res.body.should.have.property('casesPerOneMillion');
                        res.body.should.have.property('updated');
                        res.body.should.have.property('tests');
                        res.body.should.have.property('testsPerOneMillion');
                    }
                    else {
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                    }
                    done();
                });
        });
    });

    // -------------------------------- V2 TESTING --------------------------------
    it('/v2/all', (done) => {
        chai.request(app)
            .get('/v2/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    
    it('/v2/all?yesterday', (done) => {
        chai.request(app)
            .get('/v2/all?yesterday')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/all?yesterday=true', (done) => {
        chai.request(app)
            .get('/v2/all?yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/all/yesterday less than v2/all', (done) => {
        chai.request(app)
            .get('/v2/all')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                chai.request(app)
                    .get('/v2/all?yesterday')
                    .end((err2, res2) => {
                        should.not.exist(err2);
                        should.exist(res2);
                        res2.should.have.status(200);
                        res.body.cases.should.be.at.least(res2.body.cases);
                        done();
                    })
            });
    });

    it('/v2/countries/usa get correct properties', (done) => {
        chai.request(app)
            .get('/v2/countries/usa')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/v2/countries/usa?yesterday get correct properties', (done) => {
        chai.request(app)
            .get('/v2/countries/usa?yesterday')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/v2/countries/ get correct alternate name', (done) => {
        chai.request(app)
            .get('/v2/countries/united%20states')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/v2/countries?yesterday=true get correct alternate name', (done) => {
        chai.request(app)
            .get('/v2/countries/united%20states?yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/v2/countries/ get correct ios2', (done) => {
        chai.request(app)
            .get('/v2/countries/us')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/v2/countries?yesterday get correct ios2', (done) => {
        chai.request(app)
            .get('/v2/countries/us?yesterday')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/v2/countries/ get correct id', (done) => {
        chai.request(app)
            .get('/v2/countries/840')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/v2/countries?yesterday get correct id', (done) => {
        chai.request(app)
            .get('/v2/countries/840?yesterday')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/v2/countries/diamond%20princess', (done) => {
        chai.request(app)
            .get('/v2/countries/diamond%20princess')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/v2/countries/ get incorrect country name', (done) => {
        chai.request(app)
            .get('/v2/countries/asdfghjkl')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v2/countries?yesterday get incorrect country name', (done) => {
        chai.request(app)
            .get('/v2/countries/asdfghjkl?yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v2/countries?sort works', (done) => {
        chai.request(app)
            .get('/v2/countries?sort=cases')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });

    it('/v2/countries/netherlands?strict=false gives Caribbean Netherlands', (done) => {
        chai.request(app)
        .get('/v2/countries/netherlands?strict=false')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Caribbean Netherlands');
            done();
        });
    });

    it('/v2/countries/sudan?strict=false gives South Sudan', (done) => {
        chai.request(app)
        .get('/v2/countries/sudan?strict=false')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('South Sudan');
            done();
        });
    });

    it('/v2/countries/guinea?strict=false gives Equatorial Guinea', (done) => {
        chai.request(app)
        .get('/v2/countries/guinea?strict=false')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Equatorial Guinea');
            done();
        });
    });

    it('/v2/countries/netherlands?yesterday=true&strict=false gives Caribbean Netherlands', (done) => {
        chai.request(app)
        .get('/v2/countries/netherlands?yesterday=true&strict=false')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Caribbean Netherlands');
            done();
        });
    });

    it('/v2/countries/sudan?yesterday=true&strict=false gives South Sudan', (done) => {
        chai.request(app)
        .get('/v2/countries/sudan?yesterday=true&strict=false')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('South Sudan');
            done();
        });
    });

    it('/v2/countries/guinea?yesterday=true&strict=false gives Equatorial Guinea', (done) => {
        chai.request(app)
        .get('/v2/countries/guinea?yesterday=true&strict=false')
        .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('country').eql('Equatorial Guinea');
            done();
        });
    });

    it('/v2/countries?sort&yesterday=true works', (done) => {
        chai.request(app)
            .get('/v2/countries?sort=cases&yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });

    // Test that all countries map to their respective country
    countryData.map((element) => {
        it(`/v2/countries/${element.country} correct country name`, (done) => {
            chai.request(app)
                .get(`/v2/countries/${element.country}`)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    if (res.status === 200) {
                        res.body.should.be.a('object');
                        res.body.country.should.equal(element.country.replace(/'/g, "\""));
                        res.body.should.have.property('cases');
                        res.body.should.have.property('todayCases');
                        res.body.should.have.property('deaths');
                        res.body.should.have.property('todayDeaths');
                        res.body.should.have.property('casesPerOneMillion');
                        res.body.should.have.property('updated');
                        res.body.should.have.property('tests');
                        res.body.should.have.property('testsPerOneMillion');
                    }
                    else {
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                    }
                    done();
                });
        });
    });

    // Test that all yesterday countries map to their respective country
    countryData.map((element) => {
        it(`/v2/countries/${element.country}?yesterday=true correct country name`, (done) => {
            chai.request(app)
                .get(`/v2/countries/${element.country}?yesterday=true`)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    if (res.status === 200) {
                        res.body.should.be.a('object');
                        res.body.country.should.equal(element.country.replace(/'/g, "\""));
                        res.body.should.have.property('cases');
                        res.body.should.have.property('todayCases');
                        res.body.should.have.property('deaths');
                        res.body.should.have.property('todayDeaths');
                        res.body.should.have.property('casesPerOneMillion');
                        res.body.should.have.property('updated');
                        res.body.should.have.property('tests');
                        res.body.should.have.property('testsPerOneMillion');
                    }
                    else {
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                    }
                    done();
                });
        });
    });

    it('/v2/states', (done) => {
        chai.request(app)
            .get('/v2/states')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/states?yesterday=true', (done) => {
        chai.request(app)
            .get('/v2/states?yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/states?sort works', (done) => {
        chai.request(app)
            .get('/v2/states?sort=cases')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });

    it('/v2/states?sort&yesterday works', (done) => {
        chai.request(app)
            .get('/v2/states?sort=cases&yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            }); 
    });

    it('/v2/states?sort bad param', (done) => {
        chai.request(app)
            .get('/v2/states?sort=gsdfb325fsd')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/states?sort&yesterday=true bad param', (done) => {
        chai.request(app)
            .get('/v2/states?sort=gsdfb325fsd&yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/states/state works', (done) => {
        chai.request(app)
            .get('/v2/states/Illinois')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.state.should.equal("Illinois");
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('active');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/v2/states/state?yesterday=true works', (done) => {
        chai.request(app)
            .get('/v2/states/Illinois')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.state.should.equal("Illinois");
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('active');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/v2/states/state1,state2', (done) => {
        chai.request(app)
            .get('/v2/states/Illinois,New%20York')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (var row of res.body) {
                    row.should.have.property('cases');
                    row.should.have.property('todayCases');
                    row.should.have.property('deaths');
                    row.should.have.property('todayDeaths');
                    row.should.have.property('active');
                    row.should.have.property('tests');
                    row.should.have.property('testsPerOneMillion');
                }
                done();
            });
    });

    it('/v2/states/state1,state2?yesterday=true', (done) => {
        chai.request(app)
            .get('/v2/states/Illinois,New%20York?yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                for (var row of res.body) {
                    row.should.have.property('cases');
                    row.should.have.property('todayCases');
                    row.should.have.property('deaths');
                    row.should.have.property('todayDeaths');
                    row.should.have.property('active');
                    row.should.have.property('tests');
                    row.should.have.property('testsPerOneMillion');
                }
                done();
            });
    });

    it('/v2/states/ get incorrect state name', (done) => {
        chai.request(app)
            .get('/v2/states/asdfghjkl')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v2/states?yesterday=true get incorrect state name', (done) => {
        chai.request(app)
            .get('/v2/states/asdfghjkl?yesterday=true')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v2/states/state?yesterday is less than today', (done) => {
        chai.request(app)
            .get('/v2/states/illinois?yesterday=true')
            .end((err, yesterdayRes) => {
                should.not.exist(err);
                should.exist(yesterdayRes);
                yesterdayRes.should.have.status(200);
                yesterdayRes.body.should.be.a('object');
                chai.request(app)
                    .get('/v2/states/illinois')
                    .end((err2, todayRes) => {
                        should.not.exist(err2);
                        should.exist(todayRes);
                        todayRes.should.have.status(200);
                        todayRes.body.should.be.a('object');
                        todayRes.body.cases.should.be.at.least(yesterdayRes.body.cases);
                        done();
                    });
            });
    });
});
