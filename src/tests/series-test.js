'use strict';

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Series = require('../lib/series').Series;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));

describe('Series Test', function() {
    function correctBody(body) {
        for (var i = 0; i < body.length; i++) {
            var series = body[i];
            if (!(typeof (series) !== 'undefined' &&
                typeof (series.entity) !== 'undefined' &&
                typeof (series.metric) !== 'undefined')) {
                return false;
            }
        }
        return true;
    }

    var series = new Series(options);

    it('test series get query', function() {
        expect(series !== null).to.equal(true);
    });

    it('test correct query', function(done) {
        var queryPath = __dirname + '/data/series/simple-query/query.json';
        var query = JSON.parse(fs.readFileSync(queryPath, 'utf-8'));
        series.query(query, function(error, response, body) {
            console.log(body);
            expect(!error && (response.statusCode === 200) && correctBody(body)).to.equal(true);
            done();
        });
    });
});
