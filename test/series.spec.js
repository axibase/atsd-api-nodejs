'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var fs = require('fs');
var testDataQueryPath = __dirname + '/data/series';
var client = require('./test-util').client;
var series = client.data.series;
var metrics = client.metaData.metrics;
var Series = require('../src/lib/series').Series;

describe('Series Test', function () {
    this.timeout(15000);
    var payload = [{
        entity: 'nodejs-api-series-query-entity',
        metric: 'nodejs-api-series-query-metric',
        tags: {},
        data: [
            {
                d: '2016-06-07T00:00:00.000Z',
                v: 1.0
            }
        ]
    }];

    before(function (done) {
        series.insert(payload, function () {
            done();
        });
    });

    after(function (done) {
        metrics.delete(payload[0].metric, function () {
            done();
        });
    });

    it('insert', function (done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/insert/simple.json'));
        series.insert(payload, function (error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('query', function (done) {
        var queries = [
            {
                entity: payload[0].entity,
                metric: payload[0].metric,
                startDate: '2016-06-07T00:00:00.000Z',
                endDate: '2016-06-07T00:00:00.001Z'
            }
        ];

        series.query(queries, function (error, response, actualSeries) {
            expect(error).to.be.null;
            expect(response.statusCode).equal(200);
            expect(actualSeries).to.satisfy(correctBody);
            done();
        });
    });

    it('queryDetail', function (done) {
        series.queryDetail(payload[0].metric,
            payload[0].entity,
            payload[0].tags,
            new Date(Date.parse('2016-06-07T00:00:00.000Z')),
            new Date(Date.parse('2016-06-07T00:00:00.001Z')),
            function (error, response, series) {
                expect(error).to.be.null;
                expect(response.statusCode).equal(200, 404);
                expect(series).to.satisfy(correctBody);
                done();
            });
    });

    it('queryStatistic', function (done) {
        series.queryStatistic(payload[0].metric,
            payload[0].entity,
            payload[0].tags,
            new Date(Date.parse('2016-06-07T00:00:00.000Z')),
            new Date(Date.parse('2016-06-07T00:00:00.001Z')),
            Series.statistic.AVG,
            {
                count: 6,
                unit: Series.unit.HOUR
            },
            function (error, response, series) {
                expect(error).to.be.null;
                expect(response.statusCode).equal(200);
                expect(series).to.satisfy(correctBody);
                done();
            });
    });

    it('insertData', function (done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/insert/simple.json'));
        var query = payload[0];
        series.insertData(query.metric, query.entity, query.tags, query.data, function (error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    function correctSeries(series) {
        var correctObject = (typeof (series) === 'object') && (typeof (series.length) === 'number');
        if (!correctObject) {
            return false;
        }
        for (var i = 0; i < series.length; i++) {
            var tv = series[i];
            if ((typeof (tv) !== 'object' ||
                typeof (tv.d) !== 'string' ||
                typeof (tv.v) !== 'number')) {
                return false;
            }
        }
        return true;
    }

    function correctBodyElement(bodyElement) {
        return (typeof (bodyElement.metric) === 'string') &&
            (typeof (bodyElement.entity) === 'string') &&
            (correctSeries(bodyElement.data));
    }

    function correctBody(body) {
        for (var i = 0; i < body.length; i++) {
            if (!(correctBodyElement(body[i]))) {
                return false;
            }
        }
        return true;
    }
});
