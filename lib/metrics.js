var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Metrics = exports.Metrics = function(options) {
  ATSDClient.call(this, options);
};

util.inherits(Metrics, ATSDClient);

//Metrics: List
Metrics.prototype.getAll = function(params, callback) {
  this.getByEntity('', params, callback);
};

//Metrics: Entity
Metrics.prototype.getByEntity = function(entity, params, callback) {
  var path = entity !== '' ? 'entities/' + entity + '/metrics' : 'metrics';

  this.getRequest(path, params, {}, function (data) {
    callback(data);
  });
};

//Metric: Get
Metrics.prototype.get = function(metric, params, callback) {
  var path = 'metrics/' + metric;

  this.getRequest(path, params, {}, function (data) {
    callback(data);
  });
};

//Metric: Create or Replace
Metrics.prototype.put = function(metric, payload, callback) {
  var path = 'metrics/' + metric;

  this.putRequest(path, {}, payload, function (data) {
    callback(data);
  });
};

//Metric: Update
Metrics.prototype.update = function(metric, payload, callback) {
  var path = 'metrics/' + metric;

  this.patchRequest(path, {}, payload, function (data) {
    callback(data);
  });
};

//Metric: Delete
Metrics.prototype.remove = function(metric, callback) {
  var path = 'metrics/' + metric;

  this.deleteRequest(path, {}, {}, function (data) {
    callback(data);
  });
};

//Metric: Entities and Tags
Metrics.prototype.getSeries = function(metric, params, callback) {
  var path = 'metrics/' + metric + '/entity-and-tags';

  this.getRequest(path, {}, {}, function (data) {
    callback(data);
  });
};
