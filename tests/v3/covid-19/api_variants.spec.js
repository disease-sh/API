/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const { testBasicProperties } = require('../../testingFunctions');

chai.use(chaiHttp);

const variantCountries = [
	'Austria',
	'Belgium',
	'Bulgaria',
	'Croatia',
	'Cyprus',
	'Czechia',
	'Denmark',
	'Estonia',
	'Finland',
	'France',
	'Germany',
	'Greece',
	'Hungary',
	'Iceland',
	'Ireland',
	'Italy',
	'Latvia',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Malta',
	'Netherlands',
	'Norway',
	'Poland',
	'Portugal',
	'Romania',
	'Slovakia',
	'Slovenia',
	'Spain',
	'Sweden'
];

describe('TESTING /v3/covid-19/variants/countries general', () => {
	it('/v3/covid-19/variants/countries/ correct countries', (done) => {
		chai.request(app)
			.get('/v3/covid-19/variants/countries')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.be.equal(variantCountries.length);
				res.body.forEach((country) => variantCountries.should.include(country));
				done();
			});
	});


	it('TESTING /v3/covid-19/variants/countries invalid country', (done) => {
		chai.request(app)
			.get('/v3/covid-19/variants/countries/notACountry')
			.end((err, res) => {
				testBasicProperties(err, res, 404, 'object');
				res.body.should.have.property('message');
				done();
			});
	});
});

describe('TESTING /v3/covid-19/variants/countries/country', () => {
	it('/v3/covid-19/variants/Country variants correct fields set', (done) => {
		chai.request(app)
			.get('/v3/covid-19/variants/countries/Austria')
			.end((err, res) => {
				testBasicProperties(err, res, 200, 'array');
				res.body.length.should.be.above(1);
				res.body.forEach((element) => {
					element.should.have.property('updated');
					element.should.have.property('country');
					element.should.have.property('yearWeek');
					element.should.have.property('source');
					element.should.have.property('newCases');
					element.should.have.property('numberSequenced');
					element.should.have.property('percentSequenced');
					element.should.have.property('validDenominator');
					element.should.have.property('variant');
					element.should.have.property('numberDetectionsVariant');
					element.should.have.property('numberSequencedKnownVariant');
					element.should.have.property('percentVariant');
				});
				done();
			});
	});
});
