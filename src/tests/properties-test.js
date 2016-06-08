'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var Properties = require('../lib/properties').Properties;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));
var testDataQueryPath = __dirname + '/data/properties';
var properties = new Properties(options);

describe('Properties Test', function() {

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

    it('query', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/query/query.json'));

        properties.query(payload, function(error, response, properties) {
            expect(response.statusCode).to.equal(200);
            expect(error).to.be.null;
            expect(properties).to.satisfy(correctProperties);
            done();
        });
    });

    it('typeQuery', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/query/query.json'));
        properties.typeQuery(payload[0].entity, function(error, response, properties) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(properties).to.be.satisfy(Array.isArray);
            done();
        });
    });

    it('insert', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/insert/insert.json'));

        properties.insert(payload, function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('delete', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/delete/delete.json'));

        properties.delete(payload, function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
