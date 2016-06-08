'use strict';
/**
 * @author Igor Shmagrinsky <unrealwork@gmail.com>
 */

var util = require('util');
var ATSDClient = require('./client').ATSDClient;

exports.Metrics = Metrics;
var metricsPath = 'metrics';

/**
 * Class implements all methods available in MetricsAPI
 *
 * @class
 *
 * @param {Object} options
 * @constructor
 */
function Metrics(options) {
    ATSDClient.call(this, options);
}

util.inherits(Metrics, ATSDClient);

/**
 * Retrieve all metrics available in your ATSD instance
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/metric/list.md Metric List}
 *
 * @param {Function} callback  result function with retrieved data
 */
Metrics.prototype.getAll = function(callback) {
    var path = metricsPath;

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Retrieve information for specified entity
 *
 * @param {String} metric - name of metirc
 * @param {Function} callback  result function with retrieved data
 */
Metrics.prototype.get = function(metric, callback) {
    var path = metricsPath + '/' + metric;

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Create a metric with specified payload
 *
 * @param {String} metric
 * @param {String} payload
 * @param {Function} callback
 */
Metrics.prototype.create = function(metric, payload, callback) {
    var path = metricsPath + metric;

    this.putRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

// Metric: Update
// https://axibase.com/atsd/api/#metric:-update
Metrics.prototype.update = function(metric, payload, callback) {
    var path = metricsPath + metric;

    this.patchRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

// Metric: Delete
// https://axibase.com/atsd/api/#metric:-delete
Metrics.prototype.delete = function(metric, callback) {
    var path = metricsPath + metric;

    this.deleteRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

// Metric: Entities and Tags
// https://axibase.com/atsd/api/#metric:-entities-and-tags
Metrics.prototype.getEntitiesAndTags = function(metric, params, callback) {
    var path = metricsPath + metric + '/entity-and-tags';

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};
