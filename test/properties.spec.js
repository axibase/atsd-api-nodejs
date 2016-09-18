'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var Properties = require('../src/lib/properties').Properties;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));
var testDataQueryPath = __dirname + '/data/propertiesMethod';
var propertiesMethod = new Properties(options);

describe('Properties Test', function () {
    it('query', function (done) {
        var payload = [
            {
                type: 'nodejs-api-properties-query-type',
                entity: 'nodejs-api-properties-query-entity',
                key: {
                    fs: '/',
                    mp: 'sda1'
                },
                tags: {
                    fstype: 'ext4'
                },
                date: '2016-05-25T04:15:00.000Z'
            }
        ];

        var queries = [
            {
                type: payload[0].type,
                entity: payload[0].entity,
                key: payload[0].key,
                startDate: '2016-05-25T04:15:00.000Z',
                endDate: '2016-05-25T04:15:00.001Z'
            }
        ];

        var expectedProperties = payload;

        propertiesMethod.insert(payload, function (error, response) {
            expect(response.statusCode).equal(200);
            expect(error).to.be.null;
            propertiesMethod.query(queries, function (error, response, actualProperties) {
                expect(actualProperties).to.eql(expectedProperties);
                done();
            });
        });
    });

    it('typeQuery', function (done) {
        var payload = [
            {
                type: 'nodejs-api-properties-type-query-type',
                entity: 'nodejs-api-properties-type-query-entity',
                key: {
                    fs: '/',
                    mp: 'sda1'
                },
                tags: {
                    fstype: 'ext4'
                },
                date: '2016-05-25T04:15:00.000Z'
            }
        ];

        var queries = [
            {
                type: payload[0].type,
                entity: payload[0].entity,
                key: payload[0].key,
                startDate: '2016-05-25T04:15:00.000Z',
                endDate: '2016-05-25T04:15:00.001Z'
            }
        ];

        var expectedTypes = [payload[0].type];

        propertiesMethod.insert(payload, function () {
            propertiesMethod.typeQuery(payload[0].entity, function (error, response, actualProperties) {
                expect(error).to.be.null;
                expect(response.statusCode).to.equal(200);
                expect(actualProperties).eql(expectedTypes);
                done();
            });

        });
    });

    it('insert', function (done) {
        var payload = [
            {
                type: 'nodejs-api-properties-insert-type',
                entity: 'nodejs-api-properties-insert-entity',
                key: {
                    fs: '/',
                    mp: 'sda1'
                },
                tags: {
                    fstype: 'ext4'
                },
                date: '2016-05-25T04:15:00.000Z'
            }
        ];

        var queries = [
            {
                type: payload[0].type,
                entity: payload[0].entity,
                key: payload[0].key,
                startDate: '2016-05-25T04:15:00.000Z',
                endDate: '2016-05-25T04:15:00.001Z'
            }
        ];

        var expectedProperties = payload;

        propertiesMethod.insert(payload, function (error, response) {
            expect(response.statusCode).to.equal(200);
            propertiesMethod.query(queries, function (error, response, actualProperties) {
                expect(actualProperties).eql(expectedProperties);
                done();
            });
        });
    });

    it('delete', function (done) {
        var payload = [
            {
                type: 'nodejs-api-properties-delete-type',
                entity: 'nodejs-api-properties-delete-entity',
                key: {
                    fs: '/',
                    mp: 'sda1'
                },
                tags: {
                    fstype: 'ext4'
                },
                date: '2016-05-25T04:15:00.000Z'
            }
        ];

        var deleteFilter = [
            {
                type: payload[0].type,
                entity: payload[0].entity,
                key: payload[0].key,
                startDate: '2016-05-25T04:15:00.000Z',
                endDate: '2016-05-25T04:15:00.001Z'
            }
        ];

        propertiesMethod.insert(payload, function () {
            propertiesMethod.delete(deleteFilter, function (error, response) {
                expect(response.statusCode).to.equal(200);
                propertiesMethod.query(deleteFilter, function (error, response, deletedProperties) {
                    expect(deletedProperties).to.be.empty;
                    done();
                });
            });
        });

    });

    function correctProperty(property) {
        var correct = true;
        correct = correct && typeof(property === 'object');
        correct = correct && typeof(property.type === 'string');
        correct = correct && typeof(property.entity === 'string');
        correct = correct && typeof(property.key === 'object');
        correct = correct && typeof(property.tags === 'object');
        correct = correct && typeof(property === 'string');
        return correct;
    }

    function correctProperties(propertyList) {
        for (var i = 0; i < propertyList.length; i++) {
            if (!correctProperty(propertyList[i])) {
                return false;
            }
        }
        return true;
    }

    function correctResult(error, response, properties) {
        return !error &&
            response.statusCode === 200 &&
            correctProperties(properties);
    }
});
