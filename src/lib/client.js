'use strict';
var _ = require('lodash');
var request = require('request');

exports.ATSDClient = ATSDClient;

/**
 * ATSD client consturctor
 *
 * @class
 *
 * @constructor
 *
 * @param {Object} options
 * @param {String} options.url - full  url of your ATSD instance
 * @param {String} options.user - user login
 * @param {String} options.password - password
 * @param {Boolean} options.strictSSL - requires SSL certificate validation
 */
function ATSDClient(options) {
    this._baseUrl = options.url + '/api/v1/';
    this._auth = 'Basic ' + new Buffer(options.user + ':' + options.password).toString('base64');
    this._strictSSL = options.strictSSL !== undefined ? options.strictSSL : true;
}

/**
 * Convert params objects to url formatted string
 *
 * @param {Object} params - params dictionary
 * @returns {String} - url formatted string
 * @private
 */
ATSDClient.prototype._paramsToString = function(params) {
    var paramArray = [];

    _.each(params, function(value, key) {
        paramArray.push(key + '=' + value);
    });

    return paramArray.length > 0 ? '?' + paramArray.join('&') : '';
};

ATSDClient.prototype._formURL = function(path, params) {
    return this._baseUrl + path + this._paramsToString(params);
};

ATSDClient.prototype.request = function(method, path, params, payload, callback) {
    var url = this._formURL(path, params);

    request(
        {
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this._auth
            },
            json: payload,
            strictSSL: this._strictSSL
        },
        function(error, response, body) {
            console.log(method + ' ' + url);
            callback(error, response, body);
        }
    );
};

ATSDClient.prototype.getRequest = function(path, params, payload, callback) {
    this.request('GET', path, params, payload, callback);
};

ATSDClient.prototype.postRequest = function(path, params, payload, callback) {
    this.request('POST', path, params, payload, callback);
};

ATSDClient.prototype.putRequest = function(path, params, payload, callback) {
    this.request('PUT', path, params, payload, callback);
};

ATSDClient.prototype.patchRequest = function(path, params, payload, callback) {
    this.request('PATCH', path, params, payload, callback);
};

ATSDClient.prototype.deleteRequest = function(path, params, payload, callback) {
    this.request('DELETE', path, params, payload, callback);
};
