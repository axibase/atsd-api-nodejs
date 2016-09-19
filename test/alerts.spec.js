'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var Alerts = require('../src/lib/alerts').Alerts;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));
var testDataQueryPath = __dirname + '/data/alerts';
var alerts = new Alerts(options);

describe('Alerts Test', function() {

    it('query', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/query/query.json'));

        alerts.query(payload, function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('update', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/update/update.json'));

        alerts.update(payload, function(error, response) {
            expect(response.statusCode === 200).to.equal(true);
            done();
        });
    });

    it('alertsHistory', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/history-query/history-query.json'));

        alerts.historyQuery(payload, function(error, response, body) {
            expect(response.statusCode).to.oneOf([200, 404]);
            if (response.statusCode === 200) {
                expect(body).to.satisfy(Array.isArray);
            } else {
                expect(body.error).to.not.be.null;
            }
            done();
        });
    });

    it('delete', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/delete/delete.json'));
        alerts.delete(payload, function(error, response) {
            expect(response.statusCode === 200).to.equal(true);
            done();
        });
    });
});
