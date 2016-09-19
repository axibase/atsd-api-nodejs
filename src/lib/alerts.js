'use strict';

var util = require('util');
var ATSDClient = require('./client').ATSDClient;
var Alerts = exports.Alerts = function(options) {
    ATSDClient.call(this, options);
};
util.inherits(Alerts, ATSDClient);
var alertsPath = 'alerts';

/**
 * Retrieve a list of open alerts matching specified fields.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/alerts/query.md Query}
 *
 * @param {Object} payload - body of the request
 * @param {Function} callback - result function
 */
Alerts.prototype.query = function(payload, callback) {
    var path = alertsPath + '/query';

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Change acknowledgement status of the specified alerts.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/alerts/update.md Update}
 *
 * @param {Object} payload - body of the request
 * @param {Function} callback - result function
 */
Alerts.prototype.update = function(payload, callback) {
    var path = alertsPath + '/update';

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Retrieve a list of closed alerts matching specified fields.
 *
 * @param {Object} payload - body of the request
 * @param {Function} callback - result function
 */
Alerts.prototype.historyQuery = function(payload, callback) {
    var path = alertsPath + '/history/query';

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Delete specified alerts by id from the memory store.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/alerts/delete.md Update}
 *
 * @param {Object} payload - body of the request
 * @param {Function} callback - result function
 */
Alerts.prototype.delete = function(payload, callback) {
    var path = alertsPath + '/delete';
    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};
