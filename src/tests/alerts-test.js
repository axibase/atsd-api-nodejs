'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var Alerts = require('../lib/alerts').Alerts;
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

    it('delete', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/delete/delete.json'));

        alerts.delete(payload, function(error, response) {
            expect(response.statusCode === 200).to.equal(true);
            done();
        });
    });
});
