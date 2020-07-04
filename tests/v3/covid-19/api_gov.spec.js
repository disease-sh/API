/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');
const { should } = require('chai');

chai.use(chaiHttp);

const countries = [
	'Austria',
	'Canada',
	'Italy',
	'Germany',
	'Switzerland',
	'Nigeria',
	'India',
	'Vietnam',
	'New Zealand',
	'Colombia',
	'South Africa',
	'UK',
	'Israel'
];

describe('TESTING /v3/covid-19/gov general', () => {
	it('/v3/covid-19/gov correct countries', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.be.at.least(1);
				res.body.forEach((country) => countries.should.include(country));
				done();
			});
	});

	it('/v3/covid-19/gov/countries invalid country', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/fsdgdshgabv')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});
});

describe('TESTING /v3/covid-19/gov/canada', () => {
	it('/v3/covid-19/gov/canada correct amount of provinces', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/canada')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(15);
				done();
			});
	});

	it('/v3/covid-19/gov/canada correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/canada')
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

describe('TESTING /v3/covid-19/gov/italy', () => {
	it('/v3/covid-19/gov/italy correct amount of provinces', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/italy')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(21);
				done();
			});
	});

	it('/v3/covid-19/gov/italy correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/italy')
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

describe('TESTING /v3/covid-19/gov/germany', () => {
	it('/v3/covid-19/gov/germany correct amount of provinces', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/germany')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.equal(17);
				done();
			});
	});

	it('/v3/covid-19/gov/germany correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/germany')
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

describe('TESTING /v3/covid-19/gov/austria', () => {
	it('/v3/covid-19/gov/austria correct properties', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/austria')
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

	it('/v3/covid-19/gov/austria correct province properties', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/austria')
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

	it('/v3/covid-19/gov/austria correct district properties', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/austria')
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

	it('/v3/covid-19/gov/austria correct percentageBySex properties', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/austria')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('percentageBySex');
				res.body.percentageBySex.should.have.property('cases');
				res.body.percentageBySex.cases.should.have.property('male');
				res.body.percentageBySex.cases.should.have.property('female');
				res.body.percentageBySex.should.have.property('deaths');
				res.body.percentageBySex.deaths.should.have.property('male');
				res.body.percentageBySex.deaths.should.have.property('female');
				done();
			});
	});

	it('/v3/covid-19/gov/austria correct casesByAge properties', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/austria')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('casesByAge');
				Object.keys(res.body.casesByAge)
					.sort()
					.should.deep.equal(
						[
							'<5',
							'5-14',
							'15-24',
							'25-34',
							'35-44',
							'45-54',
							'55-64',
							'65-74',
							'75-84',
							'>84'
						].sort()
					);
				res.body.should.have.property('deathsByAge');
				Object.keys(res.body.deathsByAge)
					.sort()
					.should.deep.equal(
						[
							'<5',
							'5-14',
							'15-24',
							'25-34',
							'35-44',
							'45-54',
							'55-64',
							'65-74',
							'75-84',
							'>84'
						].sort()
					);
				done();
			});
	});
});

describe('TESTING /v3/covid-19/gov/switzerland', () => {
	it('/v3/covid-19/gov/switzerland correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/switzerland')
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

describe('TESTING /v3/covid-19/gov/nigeria', () => {
	it('/v3/covid-19/gov/nigeria correct length and properties', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/nigeria')
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

describe('TESTING /v3/covid-19/gov/india', () => {
	it('/v3/covid-19/gov/india correct total', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/india')
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

	it('/v3/covid-19/gov/india correct states', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/india')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('states');
				res.body.states.forEach((state) => {
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

describe('TESTING /v3/covid-19/gov/vietnam', () => {
	it('/v3/covid-19/gov/vietnam correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/vietnam')
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

describe('TESTING /v3/covid-19/gov/new zealand', () => {
	it('/v3/covid-19/gov/new zealand correct amount', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/new zealand')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('updated');
				res.body.should.have.property('provinces');
				res.body.provinces.length.should.equal(22);
				done();
			});
	});

	it('/v3/covid-19/gov/new zealand correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/new zealand')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.provinces.forEach((province) => {
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
});

describe('TESTING /v3/covid-19/gov/colombia', () => {
	it('/v3/covid-19/gov/colombia correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/colombia')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('updated');
				res.body.should.have.property('departments');
				res.body.should.have.property('cities');
				res.body.departments.length.should.be.at.least(32);
				done();
			});
	});
});

describe('TESTING /v3/covid-19/gov/south africa', () => {
	it('/v3/covid-19/gov/south africa correct data', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/south africa')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('updated');
				res.body.should.have.property('national');
				res.body.should.have.property('provinces');

				res.body.national.timeline.length.should.be.at.least(107);

				const dayNational = res.body.national.timeline.find(
					(entry) => entry.date === '2020-06-02'
				);
				should().exist(dayNational);
				dayNational.date.should.equal('2020-06-02');
				dayNational.cases.cumulative.should.equal(35812);
				dayNational.cases.unallocated.should.equal(6);
				dayNational.cases.new.should.equal(1455);
				dayNational.tests.cumulative.should.equal(761534);
				dayNational.recoveries.cumulative.should.equal(18313);
				dayNational.deaths.cumulative.should.equal(755);
				dayNational.deaths.new.should.equal(50);

				res.body.provinces.length.should.equal(9);

				const province = res.body.provinces.find(
					(entry) => entry.name === 'Eastern Cape'
				);
				should().exist(province);
				province.name.should.equal('Eastern Cape');
				province.timeline.length.should.be.at.least(107);

				const dayProvince = province.timeline.find(
					(entry) => entry.date === '2020-05-28'
				);
				should().exist(dayProvince);
				dayProvince.date.should.equal('2020-05-28');
				dayProvince.cases.should.equal(3306);
				done();
			});
	});
});

describe('TESTING /v3/covid-19/gov/UK', () => {
	it('/v3/covid-19/gov/UK correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/uk')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				const latest = Object.entries(res.body)[0][1];
				latest.should.have.property('todayTests');
				latest.should.have.property('tests');
				latest.should.have.property('testCapacity');
				latest.should.have.property('newCases');
				latest.should.have.property('cases');
				latest.should.have.property('hospitalized');
				latest.should.have.property('usedVentilationBeds');
				latest.should.have.property('newAdmissions');
				latest.should.have.property('admissions');
				latest.should.have.property('newDeaths');
				latest.should.have.property('deaths');
				done();
			});
	});
});

describe('TESTING /v3/covid-19/gov/Israel', () => {
	it('/v3/covid-19/gov/Israel correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/israel')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('updated');
				res.body.should.have.property('active');
				res.body.active.should.be.a('array');
				res.body.active.forEach((entry) => {
					entry.should.have.property('date');
					entry.should.have.property('amount');
				});
				res.body.should.have.property('updatedPatientStatus');
				res.body.updatedPatientStatus.should.be.a('array').of.length(2);
				res.body.updatedPatientStatus.forEach((entry) => {
					entry.should.have.property('name');
					entry.should.have.property('amount');
				});
				res.body.should.have.property('sickPerDateTwoDays');
				res.body.sickPerDateTwoDays.should.be.a('array').of.length(2);
				res.body.sickPerDateTwoDays.forEach((entry) => {
					entry.should.have.property('date');
					entry.should.have.property('amount');
				});
				res.body.should.have.property('sickPerLocation');
				res.body.sickPerLocation.should.be.a('array').of.length(2);
				res.body.sickPerLocation.forEach((entry) => {
					entry.should.have.property('name');
					entry.should.have.property('amount');
				});
				res.body.should.have.property('cases');
				res.body.cases.should.be.a('array');
				res.body.cases.forEach((entry) => {
					entry.should.have.property('date');
					entry.should.have.property('new_hospitalized');
					entry.should.have.property('Counthospitalized');
					entry.should.have.property('Counthospitalized_without_release');
					entry.should.have.property('CountHardStatus');
					entry.should.have.property('CountMediumStatus');
					entry.should.have.property('CountEasyStatus');
					entry.should.have.property('CountBreath');
					entry.should.have.property('CountDeath');
					entry.should.have.property('total_beds');
					entry.should.have.property('StandardOccupancy');
					entry.should.have.property('num_visits');
					entry.should.have.property('patients_home');
					entry.should.have.property('patients_hotel');
				});
				res.body.should.have.property('deaths');
				res.body.deaths.should.be.a('array');
				res.body.deaths.forEach((entry) => {
					entry.should.have.property('date');
					entry.should.have.property('amount');
				});
				res.body.should.have.property('recoveredDaily');
				res.body.recoveredDaily.should.be.a('array');
				res.body.recoveredDaily.forEach((entry) => {
					entry.should.have.property('date');
					entry.should.have.property('amount');
				});
				res.body.should.have.property('testResults');
				res.body.testResults.should.be.a('array');
				res.body.testResults.forEach((entry) => {
					entry.should.have.property('date');
					entry.should.have.property('amount');
					entry.should.have.property('positiveAmount');
				});
				res.body.should.have.property('doublingRate');
				res.body.doublingRate.should.be.a('array');
				res.body.doublingRate.forEach((entry) => {
					entry.should.have.property('date');
					entry.should.have.property('confirmed_rate');
				});
				res.body.should.have.property('activeByAgeAndGender');
				res.body.activeByAgeAndGender.should.be.a('array');
				res.body.activeByAgeAndGender.forEach((entry) => {
					entry.should.have.property('section');
					entry.should.have.property('male');
					entry.should.have.property('female');
				});
				res.body.should.have.property('isolatedDoctorsAndNurses');
				res.body.isolatedDoctorsAndNurses.should.be.a('object');
				res.body.isolatedDoctorsAndNurses.should.have.property('Verified_Doctors');
				res.body.isolatedDoctorsAndNurses.should.have.property('Verified_Nurses');
				res.body.isolatedDoctorsAndNurses.should.have.property('isolated_Doctors');
				res.body.isolatedDoctorsAndNurses.should.have.property('isolated_Nurses');
				res.body.isolatedDoctorsAndNurses.should.have.property('isolated_Other_Sector');
				res.body.should.have.property('cityData');
				res.body.cityData.should.be.a('array').of.length(150);
				res.body.cityData.forEach((entry) => {
					entry.should.have.property('city');
					entry.should.have.property('sickCount');
					entry.should.have.property('percentOfCityPopulation');
					entry.should.have.property('diff');
					entry.should.have.property('testsCount');
					entry.should.have.property('status');
				});
				res.body.should.have.property('hospitalStatus');
				res.body.hospitalStatus.should.be.a('array').of.length(36);
				res.body.hospitalStatus.forEach((entry) => {
					entry.should.have.property('name');
					entry.should.have.property('coronaOccupancy');
					entry.should.have.property('normalOccupancy');
					entry.should.have.property('isolatedTeam');
				});
				done();
			});
	});
});
