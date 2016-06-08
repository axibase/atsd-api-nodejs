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
        expect(client).to.not.be.undefined;
        expect(client).to.not.be.null;
        done();
    });

    it('no error on post', function(done) {
        var path = '';

        client.postRequest(path, {}, [], function(error) {
            expect(error).to.be.null;
            done();
        });
    });

    it('response is definded', function(done) {
        var path = '';
        client.postRequest(path, {}, [], function(error, response) {
            expect(error).to.be.null;
            expect(response).to.not.be.null;
            expect(response).to.not.be.undefined;
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

