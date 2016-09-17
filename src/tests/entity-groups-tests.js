'use strict';
/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var EntityGroups = require('../lib/entity-groups').EntityGroups;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));
var testDataQueryPath = __dirname + '/data/entity-groups';
var entityGroups = new EntityGroups(options);

describe('EntityGroups Test', function() {
    it('all entity groups', function(done) {
        entityGroups.list(function(error, response, data) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.satisfy(Array.isArray);
        });
        done();
    });

    it('specified entity group', function(done) {
        var entityGroup = 'java-loggers';
        entityGroups.get(entityGroup, function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200, 404]);
            expect(data).to.be.a('object');
            done();
        });
    });

    it('create', function(done) {
        var entityGroup = 'my-entity-group';
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/create/create.json'));
        entityGroups.create(entityGroup, payload, function(error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200,404]);
            done();
        });
    });

    it('update', function(done) {
        var entityGroup = 'my-entity-group';
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/update/update.json'));
        entityGroups.update(entityGroup, payload, function(error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200, 404]);
            done();
        });
    });

    it('delete', function(done) {
        var entityGroup = 'my-entity-group';
        entityGroups.delete(entityGroup, function(error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200, 404]);
            done();
        });
    });

    it('getEntities', function(done) {
        var entityGroup = 'my-entity-group';
        entityGroups.getEntities(entityGroup, function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200, 404]);
            if (response.statusCode === 200) {
                expect(data).to.satisfy(Array.isArray);
            }
            done();
        });
    });

    it('addEntities', function(done) {
        var entityGroup = 'my-entity-group';
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/add-entities/add-entities.json'));

        entityGroups.addEntities(entityGroup, payload, function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200,404]);
            if (response.statusCode === 200) {
                expect(data).to.satisfy(Array.isArray);
            }
            done();
        });
    });

    it('replaceEntities', function(done) {
        var entityGroup = 'my-entity-group';
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/replace-entities/replace-entities.json'));
        expect(entityGroups.replaceEntities).to.be.not.undefined;
        entityGroups.replaceEntities(entityGroup, payload, function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200,404]);
            if (response.statusCode === 200) {
                expect(data).to.satisfy(Array.isArray);
            }
            done();
        });
    });

    it('deleteEntities', function(done) {
        var entityGroup = 'my-entity-group';
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/delete-entities/delete-entities.json'));
        expect(entityGroups.deleteEntities).to.be.not.undefined;
        entityGroups.deleteEntities(entityGroup, payload, function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200,404]);
            if (response.statusCode === 200) {
                expect(data).to.satisfy(Array.isArray);
            }
            done();
        });
    });
});
