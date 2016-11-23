'use strict';
/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var fs = require('fs');
var testDataQueryPath = __dirname + '/data/entities';
var entities = require('./test-util').client.metaData.entities;

describe('Entities Test', function() {

    it('all entities', function(done) {
        entities.list(function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(data).to.satisfy(Array.isArray);
        });
        done();
    });

    it('specified entities', function(done) {
        var entity = 'atsd';
        entities.get(entity, function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(data).to.be.a('object');
        });
        done();
    });

    it('create', function(done) {
        var entity = 'my-entity';
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/create/create.json'));
        entities.create(entity, payload, function(error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
        });
        done();
    });

    it('update', function(done) {
        var entity = 'my-entity';
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/update/update.json'));
        entities.update(entity, payload, function(error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.oneOf([200, 400]);
        });
        done();
    });

    it('delete', function(done) {
        var entity = 'my-entity';
        entities.delete(entity, function(error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.oneOf([200, 400]);
        });
        done();
    });
});
