/* eslint-disable no-undef */
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../../server');
// const { testBasicProperties } = require('../../testingFunctions');

// chai.use(chaiHttp);

// describe('TESTING /v3/influenza/CDC', () => {
// 	it('/v3/influenza/cdc/ILINet correct properties', (done) => {
// 		chai.request(app)
// 			.get('/v3/influenza/cdc/ILINet')
// 			.end((err, res) => {
// 				testBasicProperties(err, res, 200, 'object');
// 				res.body.should.have.property('updated');
// 				res.body.should.have.property('source');
// 				res.body.should.have.property('data');
// 				done();
// 			});
// 	});

// 	it('/v3/influenza/cdc/ILINet correct data properties set', (done) => {
// 		chai.request(app)
// 			.get('/v3/influenza/cdc/ILINet')
// 			.end((err, res) => {
// 				testBasicProperties(err, res, 200, 'object');
// 				res.body.data.forEach((row) => {
// 					row.should.have.property('week');
// 					row.week.should.be.a('string');
// 					row.should.have.property('age 0-4');
// 					row['age 0-4'].should.be.at.least(0);
// 					row.should.have.property('age 5-24');
// 					row['age 5-24'].should.be.at.least(0);
// 					row.should.have.property('age 25-49');
// 					row['age 25-49'].should.be.at.least(0);
// 					row.should.have.property('age 50-64');
// 					row['age 50-64'].should.be.at.least(0);
// 					row.should.have.property('age 64+');
// 					row['age 64+'].should.be.at.least(0);
// 					row.should.have.property('totalILI');
// 					row.totalILI.should.be.at.least(0);
// 					row.should.have.property('totalPatients');
// 					row.totalPatients.should.be.at.least(0);
// 					row.should.have.property('percentUnweightedILI');
// 					row.percentUnweightedILI.should.be.at.least(0.0);
// 					row.should.have.property('percentWeightedILI');
// 					row.percentWeightedILI.should.be.at.least(0.0);
// 				});
// 				done();
// 			});
// 	});

// 	it('/v3/influenza/cdc/USPHL correct properties', (done) => {
// 		chai.request(app)
// 			.get('/v3/influenza/cdc/USPHL')
// 			.end((err, res) => {
// 				testBasicProperties(err, res, 200, 'object');
// 				res.body.should.have.property('updated');
// 				res.body.should.have.property('source');
// 				res.body.should.have.property('data');
// 				done();
// 			});
// 	});

// 	it('/v3/influenza/cdc/USPHL correct data properties set', (done) => {
// 		chai.request(app)
// 			.get('/v3/influenza/cdc/USPHL')
// 			.end((err, res) => {
// 				testBasicProperties(err, res, 200, 'object');
// 				res.body.data.forEach((row) => {
// 					row.should.have.property('week');
// 					row.week.should.be.a('string');
// 					row.should.have.property('A(H3N2v)');
// 					row['A(H3N2v)'].should.be.at.least(0);
// 					row.should.have.property('A(H1N1)');
// 					row['A(H1N1)'].should.be.at.least(0);
// 					row.should.have.property('A(H3)');
// 					row['A(H3)'].should.be.at.least(0);
// 					row.should.have.property('A(unable to sub-type)');
// 					row['A(unable to sub-type)'].should.be.at.least(0);
// 					row.should.have.property('A(Subtyping not performed)');
// 					row['A(Subtyping not performed)'].should.be.at.least(0);
// 					row.should.have.property('B');
// 					row.B.should.be.at.least(0);
// 					row.should.have.property('BVIC');
// 					row.BVIC.should.be.at.least(0);
// 					row.should.have.property('BYAM');
// 					row.BYAM.should.be.at.least(0);
// 					row.should.have.property('totalTests');
// 					row.totalTests.should.be.at.least(0);
// 				});
// 				done();
// 			});
// 	});

// 	it('/v3/influenza/cdc/USCL correct properties', (done) => {
// 		chai.request(app)
// 			.get('/v3/influenza/cdc/USCL')
// 			.end((err, res) => {
// 				testBasicProperties(err, res, 200, 'object');
// 				res.body.should.have.property('updated');
// 				res.body.should.have.property('source');
// 				res.body.should.have.property('data');
// 				done();
// 			});
// 	});

// 	it('/v3/influenza/cdc/USCL correct data properties set', (done) => {
// 		chai.request(app)
// 			.get('/v3/influenza/cdc/USCL')
// 			.end((err, res) => {
// 				testBasicProperties(err, res, 200, 'object');
// 				res.body.data.forEach((row) => {
// 					row.should.have.property('week');
// 					row.week.should.be.a('string');
// 					row.should.have.property('totalA');
// 					row.totalA.should.be.at.least(0);
// 					row.should.have.property('totalB');
// 					row.totalB.should.be.at.least(0);
// 					row.should.have.property('percentPositiveA');
// 					row.percentPositiveA.should.be.at.least(0);
// 					row.should.have.property('percentPositiveB');
// 					row.percentPositiveB.should.be.at.least(0);
// 					row.should.have.property('totalTests');
// 					row.totalTests.should.be.at.least(0);
// 					row.should.have.property('percentPositive');
// 					row.percentPositive.should.be.at.least(0);
// 				});
// 				done();
// 			});
// 	});
// });
