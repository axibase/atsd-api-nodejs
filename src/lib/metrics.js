'use strict';

var util = require('util');
var HttpClient = require('./client').HttpClient;

exports.Metrics = Metrics;
var metricsPath = 'metrics';

/**
 * Class implements all METHOD available in MetricsAPI
 *
 * @class
 * @param {Object} options
 * @constructor
 */
function Metrics(options) {
    HttpClient.call(this, options);
}

util.inherits(Metrics, HttpClient);

/**
 * Retrieve all metrics available in your ATSD instance
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/metric/list.md Metric List}
 *
 * @param {Function} callback  result function with retrieved data
 */
Metrics.prototype.list = function(callback) {
    var path = metricsPath;

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Retrieve information for specified entity
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/metric/get.md Get}
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
 * Create a metric with specified propertiesMethod and tags or replace an existing metric.
 * If the metric exists, all of its current propertiesMethod and tags will
 * be overwritten with fields specified in the request.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/metric/create-or-replace.md Create}
 *
 * @param {String} metric name of metric
 * @param {String} payload body request
 * @param {Function} callback result function
 */
Metrics.prototype.create = function(metric, payload, callback) {
    var path = metricsPath + '/' + metric;

    this.putRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Update specified propertiesMethod and tags for an existing metric.
 * Properties and tags that are not specified in the request are left unchanged.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/metric/update.md Update}
 *
 * @param {String} metric - name of metric
 * @param {Object} payload - body of request
 * @param {Function} callback - result function
 */
Metrics.prototype.update = function(metric, payload, callback) {
    var path = metricsPath + '/' + metric;

    this.patchRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Delete the specified metric. Data collected for the metric is removed asynchronously in the background.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/metric/delete.md Delete}
 *
 * @param {String} metric name of metric
 * @param {Function} callback result function
 */
Metrics.prototype.delete = function(metric, callback) {
    var path = metricsPath + '/' + metric;

    this.deleteRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};
