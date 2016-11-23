'use strict';
/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var testUtils = require('./test-util');
var entityGroups = testUtils.client.metaData.entityGroups;
var entities = testUtils.client.metaData.entities;
var namePrefix = 'apo-nodejs-entity-groups-';

describe('EntityGroups Test', function () {
    it('all entity groups', function (done) {
        entityGroups.list(function (error, response, data) {
            expect(response.statusCode).to.equal(200);
            expect(data).to.satisfy(Array.isArray);
            done();
        });
    });

    it('limited list of entity groups', function (done) {
        var params = {
            limit: 1
        };
        entityGroups.list(function (error, response, data) {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);
            expect(data).to.satisfy(Array.isArray);
            expect(data.length).to.be.oneOf([0, 1]);
            done();
        }, params)
    });

    it('specified entity group', function (done) {
        var entityGroup = namePrefix + 'get-entity-group';
        var payload = {
            tags: {
                a: "b"
            }
        };
        entityGroups.create(entityGroup, payload, function (error, response, data) {
            entityGroups.get(entityGroup, function (error, response, data) {
                expect(error).to.equal(null);
                expect(response.statusCode).to.equal(200);
                expect(data).to.deep.equal({name: entityGroup, tags: payload.tags});
                done();
            })
        })
    });

    it('create entity group', function (done) {
        var entityGroup = namePrefix + 'create-entity-group';
        var payload = {
            tags: {
                a: "b"
            }
        };
        entityGroups.create(entityGroup, payload, function (error, response, data) {
            entityGroups.get(entityGroup, function (error, response, data) {
                expect(error).to.equal(null);
                expect(response.statusCode).to.equal(200);
                expect(data).to.deep.equal({name: entityGroup, tags: payload.tags});
                done();
            })
        })
    });


    it('update entity group', function (done) {
        var entityGroup = namePrefix + 'update-entity-group';
        var payload = {
            tags: {
                a: "b"
            }
        };
        entityGroups.create(entityGroup, payload, function (error, response, data) {
            var updatedPart = {
                tags: {
                    c: "d"
                }
            };
            entityGroups.update(entityGroup, updatedPart, function (error, response, data) {
                entityGroups.get(entityGroup, function (error, response, data) {
                    expect(error).to.equal(null);
                    expect(response.statusCode).to.equal(200);
                    expect(data).to.deep.equal({name: entityGroup, tags: {a: "b", c: "d"}});
                    done();
                })
            })

        })
    });


    it('delete entity group', function (done) {
        var entityGroup = namePrefix + 'delete-entity-group';
        var payload = {
            tags: {
                a: "b"
            }
        };
        entityGroups.create(entityGroup, payload, function (error, response, data) {
            entityGroups.delete(entityGroup, function (error, response, data) {
                entityGroups.get(entityGroup, function (error, response) {
                    expect(response.statusCode).to.equal(404);
                    done();
                })
            })

        })
    });


    it("add entities to entity group", function (done) {
        var testPrefix = namePrefix + 'add-entities-';
        var entityGroup = testPrefix + 'entity-group';
        var entity = testPrefix + 'entity';
        entities.create(entity, {}, function () {
            var payload = [
                entity
            ];
            entityGroups.create(entityGroup, {}, function () {
                entityGroups.addEntities(entityGroup, payload, function (error, response, data) {
                    entityGroups.getEntities(entityGroup, function (error, response, data) {
                        expect(data.length).to.equal(1);
                        expect(data[0].name).to.equal(entity);
                        done();
                    })

                })
            });

        });
    });
});
