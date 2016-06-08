'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var Metrics = require('../lib/metrics').Metrics;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));
var testDataQueryPath = __dirname + '/data/metrics';
var metrics = new Metrics(options);

describe('Metrics Test', function() {

    it('all metrics', function(done) {
        metrics.getAll(function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(data).to.satisfy(Array.isArray);
        });
        done();
    });

    it('specified metrics', function(done) {
        var metric = 'actions_per_minute';
        metrics.get(metric, function(error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(data).to.be.a('object');
        });
        done();
    });
});
