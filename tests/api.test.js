'use strict';

const ITEMS_PER_PAGE = require("../src/constants").ITEMS_PER_PAGE;

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
let should = chai.should();
let assert = chai.assert;

const app = require('../src/app')(db);
const { validateInt, validateLat, validateLong, validateName, validateVehicle } = require("../src/utils");
const buildSchemas = require('../src/schemas');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('GET /rides page 1', () => {
        it (`should return ${ITEMS_PER_PAGE} rides`, (done) => {
            chai.request(app)
                .get('/rides')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(ITEMS_PER_PAGE);
                    done();
                })
        })
    })

    describe('GET /rides page 2', () => {
        it (`should return 1 ride`, (done) => {
            chai.request(app)
                .get('/rides?page=2')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    done();
                })
        })
    })

    describe('Validate Integer', () => {
        it('should reject a decimal', (done) => {
            validateInt(1.4, 'int').should.be.rejected;
            done();
        });
        it('should accept an integer', (done) => {
            validateInt(6, 'int').should.be.fulfilled;
            done();
        });
    })

    describe('Validate Lat', () => {
        it('should reject an invalid input', (done) => {
            validateLat(-100, "Start").should.be.rejected;
            done();
        });
        it('should accept a valid number', (done) => {
            validateLat(0, "Start").should.be.fulfilled;
            done();
        })
    });

    describe('Validate Long', () => {
        it('should reject an invalid input', (done) => {
            validateLong(-300, "End").should.be.rejected;
            done();
        });
        it('should accept a valid number', (done) => {
            validateLong(0, "End").should.be.fulfilled;
            done();
        })
    });

    describe('Validate Name', () => {
        it('should reject an invalid name', (done) => {
            validateName('janice;+', "Janice").should.be.rejected;
            done();
        });
        it('should accept a valid name', (done) => {
            validateName('Anya.Taylor-Joy', 'Janice').should.be.fulfilled;
            done();
        })
    });

    describe('Validate Vehicle', () => {
        it('should reject an invalid vehicle number', (done) => {
            validateVehicle('@#$*)(').should.be.rejected;
            done();
        });
        it('should accept a valid vehicle number', (done) => {
            validateVehicle("SGD1000K").should.be.fulfilled;
            done();
        })
    })
    
});