var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Metrics = exports.Metrics = function(options) {
  ATSDClient.call(this, options);
};

util.inherits(Metrics, ATSDClient);

Metrics.prototype.findAll = function (params, callback) {
  this.find('', params, callback);
};

Metrics.prototype.find = function (entity, params, callback) {
  var path = entity !== '' ? 'entities/' + entity + '/metrics' : 'metrics';

  this.get(path, params, {}, function (data) {
    var metrics = [];

    _.each(data, function (entry) {
      metrics.push(entry.name);
    });

    callback(metrics);
  });
};