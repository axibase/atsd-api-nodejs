'use strict';

var _ = require('lodash');
var request = require('request');
var logger = require('npmlog');
logger.enableColor();

exports.HttpClient = HttpClient;

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
 * @param {String} options.password - passwo
 * @param {Boolean} options.strictSSL - requires SSL certificate validatio  n
 */
function HttpClient(options) {
    this._options = options;
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
HttpClient.prototype._paramsToString = function (params) {
    var paramArray = [];
    _.each(params, function (value, key) {
        paramArray.push(key + '=' + value);
    });
    return paramArray.length > 0 ? '?' + paramArray.join('&') : '';
};

HttpClient.prototype._formURL = function (path, params) {
    return this._baseUrl + path + this._paramsToString(params);
};

HttpClient.prototype.request = function (method, path, params, payload, callback) {
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
        function (error, response, body) {
            logger.info('HTTPRequest : ', '%j to %j', method, url);
            logger.info('Status code: ', response.statusCode);
            logger.info('Response : ', '%j', response.body);
            callback(error, response, body);
        }
    );
};

HttpClient.METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

HttpClient.prototype.getRequest = function (path, params, payload, callback) {
    this.request(HttpClient.METHOD.GET, path, params, payload, callback);
};

HttpClient.prototype.postRequest = function (path, params, payload, callback) {
    this.request(HttpClient.METHOD.POST, path, params, payload, callback);
};

HttpClient.prototype.putRequest = function (path, params, payload, callback) {
    this.request(HttpClient.METHOD.PUT, path, params, payload, callback);
};

HttpClient.prototype.patchRequest = function (path, params, payload, callback) {
    this.request(HttpClient.METHOD.PATCH, path, params, payload, callback);
};

HttpClient.prototype.deleteRequest = function (path, params, payload, callback) {
    this.request(HttpClient.METHOD.DELETE, path, params, payload, callback);
};
