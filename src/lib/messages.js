'use strict';

var util = require('util');
var ATSDClient = require('./client').ATSDClient;
var Messages = exports.Messages = function(options) {
    ATSDClient.call(this, options);
};
util.inherits(Messages, ATSDClient);
var messagesPath = 'messages';

/**
 * Retrieve message records for the specified filters..
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/alerts/query.md Query}
 *
 * @param {Object} payload - body of the request
 * @param {Function} callback - result function
 */
Messages.prototype.query = function(payload, callback) {
    var path = messagesPath + '/query';

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Insert messages.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/alerts/insert.md Update}
 *
 * @param {Object} payload - body of the request
 * @param {Function} callback - result function
 */
Messages.prototype.insert = function(payload, callback) {
    var path = messagesPath + '/insert';
    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};
