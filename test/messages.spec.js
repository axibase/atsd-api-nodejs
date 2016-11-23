'use strict';

/**
 * @author Igor Shmagrinskiy <unrealwork@gmail.com>
 */

var chai = require('chai');
var expect = chai.expect; // we are using the 'expect' style of Chai
var messages = require('./test-util').client.data.messages;

describe('Messages Test', function () {
    var MESSAGE_INSERT_DELAY = 1000;
    it('query', function (done) {
        var startDate = new Date();
        var payload = [
            {
                entity: 'nodejs-api-message-query-entity',
                type: 'nodejs-api-message-query-type',
                message: 'message',
                severity: 'MAJOR',
                source: 'nodejs-api-test'
            }
        ];

        var messagesFilter = [
            {
                entity: payload[0].entity,
                type: payload[0].type,
                startDate: startDate.toISOString(),
                endDate: 'now'
            }
        ];
        var expectedMessages = payload;

        messages.insert(payload, function () {
            setTimeout(function () {
                messages.query(messagesFilter, function (error, response, actualMessages) {
                    expect(error).to.be.null;
                    expect(response.statusCode).equal(200);
                    expect(actualMessages.length).equal(1);
                    expect(actualMessages.message).equal(expectedMessages.message);
                    expect(actualMessages.entity).equal(expectedMessages.entity);
                    expect(actualMessages.severity).equal(expectedMessages.severity);
                    done();
                });
            }, MESSAGE_INSERT_DELAY);
        });
    });

    it('insert', function (done) {
        var startDate = new Date();
        var payload = [
            {
                entity: 'nodejs-api-message-insert-entity',
                type: 'nodejs-api-message-insert-type',
                message: 'message',
                severity: 'MAJOR',
                source: 'nodejs-api-test'
            }
        ];

        var messagesFilter = [
            {
                entity: payload[0].entity,
                type: payload[0].type,
                startDate: startDate.toISOString(),
                endDate: 'now'
            }
        ];
        var expectedMessages = payload;

        messages.insert(payload, function (error, response) {
            expect(response.statusCode).to.equal(200);
            setTimeout(function () {
                messages.query(messagesFilter, function (error, response, actualMessages) {
                    expect(actualMessages.length).equal(1);
                    expect(actualMessages.message).equal(expectedMessages.message);
                    expect(actualMessages.entity).equal(expectedMessages.entity);
                    expect(actualMessages.severity).equal(expectedMessages.severity);
                    done();
                });
            }, MESSAGE_INSERT_DELAY);
        });
    });
});
