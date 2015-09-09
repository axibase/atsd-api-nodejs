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
Metrics.prototype.get = function(params, callback) {
};

//Metric: Create or Replace
Metrics.prototype.put = function(params, callback) {
};

//Metric: Update
Metrics.prototype.update = function(params, callback) {
};

//Metric: Delete
Metrics.prototype.remove = function(params, callback) {
};

//Metric: Entities and Tags
Metrics.prototype.getSeries = function(params, callback) {
};
