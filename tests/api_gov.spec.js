const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { testBasicProperties } = require('./testingFunctions');

chai.use(chaiHttp);

const countries = ['Austria', 'Canada', 'Italy', 'Germany', 'Switzerland', 'Nigeria', 'India', 'Vietnam', 'New Zealand', 'Colombia'].sort();

describe('TESTING /v2/gov general', () => {
	it('/v2/gov correct countries', (done) => {
		chai.request(app)
			.get('/v2/gov')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
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
				testBasicProperties(err, res, 404, 'object');
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
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(15);
				done();
			});
	});

	it('/v2/gov/canada correct fields set', (done) => {
		chai.request(app)
			.get('/v2/gov/canada')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.forEach((element) => {
					element.should.have.property('updated');
					element.should.have.property('province');
					element.should.have.property('cases');
					element.cases.should.be.at.least(0);
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
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(21);
				done();
			});
    	});
    
	it('/v2/gov/italy correct fields set', (done) => {
		chai.request(app)
			.get('/v2/gov/italy')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
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
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(17);
				done();
			});
	});

	it('/v2/gov/germany correct fields set', (done) => {
		chai.request(app)
			.get('/v2/gov/germany')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
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
				testBasicProperties(err, res, 200, 'object');
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
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('provinces');
				res.body.districts.should.be.a('array');
				res.body.provinces.forEach((element) => {
					element.should.have.property('province');
					element.should.have.property('cases');
					element.should.have.property('recovered');
					element.should.have.property('deaths');
				});
				done();
			});
	});

	it('/v2/gov/austria correct district properties', (done) => {
		chai.request(app)
			.get('/v2/gov/austria')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
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
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('percentageBySex');
				res.body.percentageBySex.should.have.property('cases')
				res.body.percentageBySex.cases.should.have.property('male')
				res.body.percentageBySex.cases.should.have.property('female')
				res.body.percentageBySex.should.have.property('deaths')
				res.body.percentageBySex.deaths.should.have.property('male')
				res.body.percentageBySex.deaths.should.have.property('female')
				done();
			});
	});

	it('/v2/gov/austria correct casesByAge properties', (done) => {
		chai.request(app)
			.get('/v2/gov/austria')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('casesByAge');
				['<5', '5-14', '15-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '>84'].forEach(key => {
					res.body.casesByAge.should.have.property(key);
				});
				res.body.should.have.property('deathsByAge');
				['<5', '5-14', '15-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '>84'].forEach(key => {
					res.body.deathsByAge.should.have.property(key);
				});
				done();
			});
	});
});

describe('TESTING /v2/gov/switzerland', () => {
	it('/v2/gov/switzerland correct fields set', (done) => {
		chai.request(app)
			.get('/v2/gov/switzerland')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.forEach((element) => {
					element.should.have.property('updated');
					element.should.have.property('canton');
					element.should.have.property('cases');
					element.should.have.property('deaths');
					element.should.have.property('recovered');
					element.should.have.property('newHospitalizations');
					element.should.have.property('hospitalizations');
					element.should.have.property('intensiveCare');
					element.should.have.property('critical');
					element.should.have.property('source');
				});
				done();
			});
	});
});

describe('TESTING /v2/gov/nigeria', () => {
	it('/v2/gov/nigeria correct length and properties', (done) => {
		chai.request(app)
			.get('/v2/gov/nigeria')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.be.at.least(35);
				res.body.forEach((state) => {
					state.should.have.property('state');
					state.should.have.property('cases');
					state.should.have.property('deaths');
					state.should.have.property('active');
					state.should.have.property('recovered');
					state.should.have.property('updated');
				});
				done();
			});
	});
});

describe('TESTING /v2/gov/india', () => {
	it('/v2/gov/india correct total', (done) => {
		chai.request(app)
			.get('/v2/gov/india')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('total');
				res.body.total.should.have.property('total');
				res.body.total.should.have.property('active');
				res.body.total.should.have.property('recovered');
				res.body.total.should.have.property('deaths');
				done();
			});
	});

	it('/v2/gov/india correct states', (done) => {
		chai.request(app)
			.get('/v2/gov/india')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('states');
				res.body.states.forEach(state => {
					state.should.have.property('state');
					state.should.have.property('total');
					state.should.have.property('active');
					state.should.have.property('recovered');
					state.should.have.property('deaths');
				});
				done();
			});
	});
});

describe('TESTING /v2/gov/vietnam', () => {
	it('/v2/gov/vietnam correct fields set', (done) => {
		chai.request(app)
			.get('/v2/gov/vietnam')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.forEach((element) => {
					element.should.have.property('updated');
					element.should.have.property('city');
					element.should.have.property('cases');
					element.should.have.property('beingTreated');
					element.should.have.property('recovered');
					element.should.have.property('deaths');
				});
				done();
			});
	});
});

describe('TESTING /v2/gov/new zealand', () => {
	it('/v2/gov/new zealand correct amount', (done) => {
		chai.request(app)
			.get('/v2/gov/new zealand')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('updated');
				res.body.should.have.property('provinces');
				res.body.provinces.length.should.equal(21);
				done();
			});
	});

	it('/v2/gov/new zealand correct fields set', (done) => {
		chai.request(app)
			.get('/v2/gov/new zealand')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.provinces.forEach(province => {
					province.should.have.property('province');
					province.should.have.property('active');
					province.active.should.be.at.least(0);
					province.should.have.property('cases');
					province.cases.should.be.at.least(0);
					province.should.have.property('recovered');
					province.recovered.should.be.at.least(0);
					province.should.have.property('deaths');
					province.deaths.should.be.at.least(0);
					province.should.have.property('newCases');
				});
				done();
			});
  });

  describe('TESTING /v2/gov/colombia', () => {
    it('/v2/gov/colombia correct fields set', (done) => {
      chai.request(app)
        .get('/v2/gov/colombia')
        .end((err, res) => {
          testBasicProperties(err, res, 200, 'object');
          res.body.should.have.property('updated');
          res.body.should.have.property('departments');
          res.body.should.have.property('cities');
          res.body.departments.length.should.equal(35);
          done();
        });
    });
  });
});
