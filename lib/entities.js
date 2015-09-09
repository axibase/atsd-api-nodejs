var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Entities = exports.Entities = function(options) {
  ATSDClient.call(this, options);
};

util.inherits(Entities, ATSDClient);

Entities.prototype.findAll = function (params, callback) {
  var path = 'entities';

  this.get(path, params, {}, function (data) {
    var entities = [];

    _.each(data, function (entry) {
      entities.push(entry.name);
    });

    callback(entities);
  });
};

Entities.prototype.find = function (metric, params, callback) {
  var path = 'metrics/' + metric + '/entity-and-tags';

  this.get(path, params, {}, function (data) {
    var entities = [];

    _.each(data, function (entry) {
      entities.push(entry.entity);
    });

    entities = entities.filter(function (elem, pos) {
      return entities.indexOf(elem) === pos;
    });

    callback(entities);
  });
};