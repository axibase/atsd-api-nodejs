'use strict';

var chai = require('chai');
var expect = chai.expect;
var ATSDClient = require('./../lib/client').ATSDClient;
var fs = require('fs');
var testOptionsPath = __dirname + '/test-options.json';
var options = JSON.parse(fs.readFileSync(testOptionsPath, 'utf8'));

describe('Client test', function() {
    var client = new ATSDClient(options);
    it('client class created', function(done) {
        expect(typeof (client) !== 'undefined').to.equal(true);
        done();
    });

    it('no error on post', function(done) {
        var path = '';

        client.postRequest(path, {}, [], function(error) {
            expect(!error).to.equal(true);
            done();
        });
    });

    it('response is definded', function(done) {
        var path = '';
        client.postRequest(path, {}, [], function(error, response) {
            expect(typeof(response) !== 'undefined').to.equal(true);
            done();
        });
    });

    it('respose code 200 on correct query', function(done) {
        var path = 'series/query';
        client.postRequest(path, {}, [], function(error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

