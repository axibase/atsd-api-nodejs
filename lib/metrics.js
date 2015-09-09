var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Metrics = exports.Metrics = function (options) {
  ATSDClient.call(this, options);
};

util.inherits(Metrics, ATSDClient);

// Metrics: List
// https://axibase.com/atsd/api/#metrics:-list
Metrics.prototype.getAll = function (params, callback) {
  var path = 'metrics';

  this.getRequest(path, params, {}, function (error, response, body) {
    callback(body);
  });
};

// Metrics: Entity
// https://axibase.com/atsd/api/#metrics:-entity
Metrics.prototype.getByEntity = function (entity, params, callback) {
  var path = 'entities/' + entity + '/metrics';

  this.getRequest(path, params, {}, function (error, response, body) {
    callback(body);
  });
};

// Metric: Get
// https://axibase.com/atsd/api/#metric:-get
Metrics.prototype.get = function (metric, params, callback) {
  var path = 'metrics/' + metric;

  this.getRequest(path, params, {}, function (error, response, body) {
    callback(body);
  });
};

// Metric: Create or Replace
// https://axibase.com/atsd/api/#metric:-create-or-replace
Metrics.prototype.create = function (metric, payload, callback) {
  var path = 'metrics/' + metric;

  this.putRequest(path, {}, payload, function (error, response, body) {
    callback(body);
  });
};

// Metric: Update
// https://axibase.com/atsd/api/#metric:-update
Metrics.prototype.update = function (metric, payload, callback) {
  var path = 'metrics/' + metric;

  this.patchRequest(path, {}, payload, function (error, response, body) {
    callback(body);
  });
};

// Metric: Delete
// https://axibase.com/atsd/api/#metric:-delete
Metrics.prototype.delete = function (metric, callback) {
  var path = 'metrics/' + metric;

  this.deleteRequest(path, {}, {}, function (error, response, body) {
    callback(body);
  });
};

// Metric: Entities and Tags
// https://axibase.com/atsd/api/#metric:-entities-and-tags
Metrics.prototype.getEntitiesAndTags = function (metric, params, callback) {
  var path = 'metrics/' + metric + '/entity-and-tags';

  this.getRequest(path, {}, {}, function (error, response, body) {
    callback(body);
  });
};