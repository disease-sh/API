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
	'Switzerland',
	'Nigeria',
	'India',
	'New Zealand',
	'South Africa',
	'UK',
	'Indonesia',
	'Israel',
	'Vietnam'
];

describe.skip('TESTING /v3/covid-19/gov general', () => {
	it('/v3/covid-19/gov correct countries', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.be.equal(countries.length);
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

describe.skip('TESTING /v3/covid-19/gov/canada', () => {
	it('/v3/covid-19/gov/canada correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/canada')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.be.above(1);
				res.body.forEach((element) => {
					element.should.have.property('updated');
					element.should.have.property('province');
					element.should.have.property('date');
					element.should.have.property('todayCases');
					element.should.have.property('todayTests');
					element.should.have.property('todayRecovered');
					element.should.have.property('todayDeaths');
					element.should.have.property('cases');
					element.should.have.property('active');
					element.should.have.property('tests');
					element.should.have.property('recovered');
					element.should.have.property('deaths');
				});
				done();
			});
	});
});

describe.skip('TESTING /v3/covid-19/gov/italy', () => {
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

describe.skip('TESTING /v3/covid-19/gov/germany', () => {
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
					element.should.have.property('sevenDayCasesPerHundredThousand');
					element.should.have.property('deaths');
					element.deaths.should.be.at.least(0);
				});
				done();
			});
	});
});

describe.skip('TESTING /v3/covid-19/gov/austria', () => {
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

describe.skip('TESTING /v3/covid-19/gov/switzerland', () => {
	it('/v3/covid-19/gov/switzerland correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/switzerland')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.forEach((element) => {
					element.should.have.property('updated');
					element.should.have.property('date');
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

describe.skip('TESTING /v3/covid-19/gov/nigeria', () => {
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

describe.skip('TESTING /v3/covid-19/gov/india', () => {
	it('/v3/covid-19/gov/india correct total', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/india')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('total');
				res.body.total.should.have.property('active');
				res.body.total.should.have.property('recovered');
				res.body.total.should.have.property('deaths');
				res.body.total.should.have.property('cases');
				res.body.total.should.have.property('todayActive');
				res.body.total.should.have.property('todayRecovered');
				res.body.total.should.have.property('todayDeaths');
				res.body.total.should.have.property('todayCases');
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
					state.should.have.property('active');
					state.should.have.property('recovered');
					state.should.have.property('deaths');
					state.should.have.property('cases');
					state.should.have.property('todayActive');
					state.should.have.property('todayRecovered');
					state.should.have.property('todayDeaths');
					state.should.have.property('todayCases');
				});
				done();
			});
	});
});

describe.skip('TESTING /v3/covid-19/gov/new zealand', () => {
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
				});
				done();
			});
	});
});

describe.skip('TESTING /v3/covid-19/gov/south africa', () => {
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

describe.skip('TESTING /v3/covid-19/gov/UK', () => {
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
				latest.should.have.property('todayDeaths');
				latest.should.have.property('totalDeaths');
				latest.should.have.property('ONSweeklyDeaths');
				latest.should.have.property('ONStotalDeaths');
				done();
			});
	});
});

describe.skip('TESTING /v3/gov/Israel', () => {
	it('/v3/gov/Israel correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/Israel')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('updated');
				res.body.should.have.property('data');
				res.body.data.byAgeAndGender.should.have.property('cases');
				res.body.data.byAgeAndGender.cases.length.should.equal(10);
				res.body.data.byAgeAndGender.should.have.property('deaths');
				res.body.data.byAgeAndGender.deaths.length.should.equal(10);
				res.body.data.byAgeAndGender.should.have.property('onVentilators');
				res.body.data.byAgeAndGender.onVentilators.length.should.equal(10);
				res.body.data.byAgeAndGender.should.have.property('critical');
				res.body.data.byAgeAndGender.critical.length.should.equal(10);
				// res.body.data.should.have.property('healthPersonnel');
				// res.body.data.healthPersonnel.should.have.property('verifiedDoctors');
				// res.body.data.healthPersonnel.should.have.property('verifiedNurses');
				// res.body.data.healthPersonnel.should.have.property('isolatedDoctors');
				// res.body.data.healthPersonnel.should.have.property('isolatedNurses');
				// res.body.data.healthPersonnel.should.have.property('isolatedOtherSector');
				// res.body.data.should.have.property('hospitalData');
				// const firstHospital = res.body.data.hospitalData[0];
				// firstHospital.should.have.property('name');
				// firstHospital.should.have.property('coronaOccupancy');
				// firstHospital.should.have.property('normalOccupancy');
				// firstHospital.should.have.property('isolatedTeam');
				// const firstCity = res.body.data.cityData[0];
				// firstCity.should.have.property('city');
				// firstCity.should.have.property('sickCount');
				// firstCity.should.have.property('actualSick');
				// firstCity.should.have.property('verifiedLast7Days');
				// firstCity.should.have.property('testLast7Days');
				res.body.data.trafficLightMap.should.have.property('cityData');
				const trafficLightMapFirstCity = res.body.data.trafficLightMap.cityData[0];
				trafficLightMapFirstCity.should.have.property('name');
				trafficLightMapFirstCity.should.have.property('score');
				trafficLightMapFirstCity.should.have.property('color');
				trafficLightMapFirstCity.should.have.property('newCasesPer10kLastWeek');
				trafficLightMapFirstCity.should.have.property('pctPositiveTestsLastWeek');
				trafficLightMapFirstCity.should.have.property('weeklyChangeInCasesPer10k');
				trafficLightMapFirstCity.should.have.property('activeCases');
				res.body.data.trafficLightMap.should.have.property('lastUpdate');
				const latest = res.body.data.timeline[0];
				latest.should.have.property('date');
				latest.should.have.property('newHospitalized');
				latest.should.have.property('totalHospitalized');
				latest.should.have.property('homePatients');
				latest.should.have.property('hotelPatients');
				latest.should.have.property('totalBeds');
				latest.should.have.property('standardOccupancy');
				latest.should.have.property('newDeaths');
				latest.should.have.property('newlyRecovered');
				latest.should.have.property('newTotalTestsTaken');
				latest.should.have.property('newVirusTestsTaken');
				latest.should.have.property('newPositiveTests');
				latest.should.have.property('activeNoncritical');
				latest.should.have.property('activeModerate');
				latest.should.have.property('activeSerious');
				latest.should.have.property('activeCritical');
				latest.should.have.property('onVentilators');
				done();
			});
	});
});

describe.skip('TESTING /v3/covid-19/gov/vietnam', () => {
	it('/v3/covid-19/gov/vietnam correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/vietnam')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body[0].should.have.property('updated');
				res.body[0].should.have.property('city');
				res.body[0].should.have.property('cases');
				res.body[0].should.have.property('beingTreated');
				res.body[0].should.have.property('recovered');
				res.body[0].should.have.property('deaths');
				done();
			});
	});
});

describe.skip('TESTING /v3/covid-19/gov/south korea', () => {
	it('/v3/covid-19/gov/south korea correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/gov/south korea')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body[0].should.have.property('updated');
				res.body[0].should.have.property('city');
				res.body[0].should.have.property('todayCases');
				res.body[0].should.have.property('importedCasesToday');
				res.body[0].should.have.property('localCasesToday');
				res.body[0].should.have.property('cases');
				res.body[0].should.have.property('isolated');
				res.body[0].should.have.property('recovered');
				res.body[0].should.have.property('deaths');
				res.body[0].should.have.property('incidence');
				done();
			});
	});
});

describe.skip('TESTING /v3/covid-19/gov/Indonesia', () => {
	it('/v3/covid-19/gov/Indonesia correct fields set', (done) => {
		function checkListData(prop, isUsia) {
			prop.should.have.property('key');
			prop.should.have.property('doc_count');
			if (isUsia === true) {
				prop.should.have.property('usia');
				prop.usia.should.have.property('value');
			}
		}
		function checkKasus(prop, isUsia) {
			prop.list_data.forEach((a) => { checkListData(a, isUsia); });
		}
		function checkData(prop) {
			prop.should.have.property('kondisi_penyerta');
			checkKasus(prop.kondisi_penyerta, false);
			prop.should.have.property('jenis_kelamin');
			checkKasus(prop.jenis_kelamin, false);
			prop.should.have.property('kelompok_umur');
			checkKasus(prop.kelompok_umur, true);
			prop.should.have.property('gejala');
			checkKasus(prop.gejala, false);
		}
		function checkHarian(prop) {
			prop.should.have.property('key_as_string');
			prop.should.have.property('key');
			prop.should.have.property('doc_count');
			prop.should.have.property('jumlah_positif');
			prop.jumlah_positif.should.have.property('value');
			prop.should.have.property('jumlah_meninggal');
			prop.jumlah_meninggal.should.have.property('value');
			prop.should.have.property('jumlah_sembuh');
			prop.jumlah_sembuh.should.have.property('value');
			prop.should.have.property('jumlah_dirawat');
			prop.jumlah_dirawat.should.have.property('value');
			prop.should.have.property('jumlah_positif_kum');
			prop.jumlah_positif_kum.should.have.property('value');
			prop.should.have.property('jumlah_meninggal_kum');
			prop.jumlah_meninggal_kum.should.have.property('value');
			prop.should.have.property('jumlah_sembuh_kum');
			prop.jumlah_sembuh_kum.should.have.property('value');
			prop.should.have.property('jumlah_dirawat_kum');
			prop.jumlah_dirawat_kum.should.have.property('value');
		}
		function checkProvListData(prop) {
			checkListData(prop, false);
			prop.should.have.property('jumlah_kasus');
			prop.should.have.property('jumlah_meninggal');
			prop.should.have.property('jumlah_sembuh');
			prop.should.have.property('jumlah_dirawat');
			prop.should.have.property('jenis_kelamin');
			prop.jenis_kelamin.forEach((a) => { checkListData(a, false); });
			prop.should.have.property('kelompok_umur');
			prop.kelompok_umur.forEach((a) => { checkListData(a, false); });
			prop.should.have.property('lokasi');
			prop.lokasi.should.have.property('lat');
			prop.lokasi.should.have.property('lon');
			prop.should.have.property('penambahan');
			prop.penambahan.should.have.property('positif');
			prop.penambahan.should.have.property('sembuh');
			prop.penambahan.should.have.property('meninggal');
		}
		chai.request(app)
			.get('/v3/covid-19/gov/Indonesia')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'object');
				res.body.should.have.property('data');
				res.body.data.should.have.property('last_update');
				res.body.data.should.have.property('kasus');
				checkData(res.body.data.kasus);
				res.body.data.should.have.property('sembuh');
				checkData(res.body.data.sembuh);
				res.body.data.should.have.property('meninggal');
				checkData(res.body.data.meninggal);
				res.body.data.should.have.property('perawatan');
				checkData(res.body.data.perawatan);
				res.body.should.have.property('update');
				res.body.update.should.have.property('data');
				res.body.update.data.should.have.property('id');
				res.body.update.data.should.have.property('jumlah_odp');
				res.body.update.data.should.have.property('jumlah_pdp');
				res.body.update.data.should.have.property('total_spesimen');
				res.body.update.data.should.have.property('total_spesimen_negatif');
				res.body.update.should.have.property('update');
				res.body.update.update.should.have.property('penambahan');
				res.body.update.update.penambahan.should.have.property('jumlah_positif');
				res.body.update.update.penambahan.should.have.property('jumlah_meninggal');
				res.body.update.update.penambahan.should.have.property('jumlah_sembuh');
				res.body.update.update.penambahan.should.have.property('jumlah_dirawat');
				res.body.update.update.penambahan.should.have.property('tanggal');
				res.body.update.update.penambahan.should.have.property('created');
				res.body.update.update.should.have.property('harian');
				res.body.update.update.harian.forEach(checkHarian);
				res.body.update.update.should.have.property('total');
				res.body.update.update.total.should.have.property('jumlah_positif');
				res.body.update.update.total.should.have.property('jumlah_meninggal');
				res.body.update.update.total.should.have.property('jumlah_sembuh');
				res.body.update.update.total.should.have.property('jumlah_dirawat');
				res.body.should.have.property('prov');
				res.body.prov.should.have.property('last_date');
				res.body.prov.should.have.property('current_data');
				res.body.prov.should.have.property('missing_data');
				res.body.prov.should.have.property('tanpa_provinsi');
				res.body.prov.should.have.property('list_data');
				res.body.prov.list_data.forEach(checkProvListData);
				done();
			});
	});
});
