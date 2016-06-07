'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var Series = require('../lib/series').Series;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));
var testDataQueryPath = __dirname + '/data/series';

describe('Series Test', function() {

    function correctSeries(series) {
        var correctObject = (typeof (series) === 'object') && (typeof (series.length) === 'number');
        if (!correctObject) {
            return false;
        }
        for (var i = 0; i < series.length; i++) {
            var tv = series[i];
            if (!(typeof (tv) === 'object' &&
                typeof (tv.d) === 'string' &&
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

    function correctSeriesCallbackData(error, response, body) {
        return !error && (response.statusCode === 200) && correctBody(body);
    }

    var series = new Series(options);

    it('series intialized', function() {
        expect(series !== null).to.equal(true);
    });

    it('query', function(done) {
        var queryPath = testDataQueryPath + '/query/query.json';
        var query = JSON.parse(fs.readFileSync(queryPath, 'utf-8'));
        series.query(query, function(error, response, series) {
            expect(correctSeriesCallbackData(error, response, series)).to.equal(true);
            done();
        });
    });

    it('queryDetail', function(done) {
        var payload = {
            metric: 'jvm_memory_used',
            entity: 'atsd',
            tags: {},
            startTime: new Date('2016-06-07T00:00:00'),
            endTime: new Date()
        };
        series.queryDetail(payload.metric,
            payload.entity,
            payload.tags,
            payload.startTime,
            payload.endTime,
            function(error, response, series) {
                expect(correctSeriesCallbackData(error, response, series)).to.equal(true);
                done();
            });
    });

    it('queryStatistic', function(done) {
        var payload = {
            metric: 'jvm_memory_used',
            entity: 'atsd',
            tags: {},
            startTime: new Date('2016-06-07T00:00:00'),
            endTime: new Date()
        };
        series.queryStatistic(payload.metric,
            payload.entity,
            payload.tags,
            payload.startTime,
            payload.endTime,
            Series.statistic.AVG,
            {
                count: 6,
                unit: Series.unit.HOUR
            },
            function(error, response, series) {
                expect(correctSeriesCallbackData(error, response, series)).to.equal(true);
                done();
            });
    });

    it('insert', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/insert/simple.json'));

        series.insert(payload, function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
