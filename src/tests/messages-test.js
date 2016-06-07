'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var Messages = require('../lib/messages').Messages;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));
var testDataQueryPath = __dirname + '/data/messages';
var messages = new Messages(options);

describe('Messages Test', function() {

    it('query', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/query/query.json'));

        messages.query(payload, function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('insert', function(done) {
        var payload = JSON.parse(fs.readFileSync(testDataQueryPath + '/insert/insert.json'));

        messages.insert(payload, function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
