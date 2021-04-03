'use strict';

const ITEMS_PER_PAGE = require("../src/constants").ITEMS_PER_PAGE;

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

chai.use(chaiHttp);

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
});