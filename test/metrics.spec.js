'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var metrics = require('./test-util').client.metaData.metrics;
var namesPrefix = 'api-nodesj-metrics-';


describe('Metrics Test', function () {

    it('all metrics', function (done) {
        metrics.list(function (error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            expect(data).to.satisfy(Array.isArray);
            done();
        });
    });

    it('specified metrics', function (done) {
        var metric = 'actions_per_minute';
        metrics.get(metric, function (error, response, data) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.oneOf([200, 404]);
            expect(data).to.be.a('object');
            done();
        });
    });

    it('create', function (done) {
        var metric = 'api-nodesj-metrics-create-metric';
        var payload = {
            enabled: true,
            persistent: true,
            dataType: "DOUBLE",
            timePrecision: "MILLISECONDS"
        };
        metrics.create(metric, payload, function (error, response) {
            expect(error).to.be.null;
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('update', function (done) {
        var metric = namesPrefix + 'update-metric';
        var payload = {
            enabled: true
        };

        metrics.create(metric, payload, function (error, response) {
            var updateMetricFields = {
                enabled: false
            };
            metrics.update(metric, updateMetricFields, function (error, response) {
                expect(error).to.be.null;
                expect(response.statusCode).to.equal(200);
                metrics.get(metric, function (error, response, body) {
                    expect(body.enabled).to.equal(false);
                    done();
                });
            });
        });


    });

    it('delete', function (done) {
        var metric = namesPrefix + 'delete-metric';
        metrics.create(metric, {}, function (error, response) {
            expect(error).to.equal(null);
            expect(response.statusCode).to.equal(200);
            metrics.delete(metric, function (error, response) {
                expect(error).to.be.null;
                expect(response.statusCode).to.equal(200);
                metrics.get(metric, function (error, response) {
                    expect(response.statusCode).equal(404);
                    done();
                })
            });
        });

    });
});
