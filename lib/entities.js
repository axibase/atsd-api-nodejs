var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Entities = exports.Entities = function(options) {
  ATSDClient.call(this, options);
};

util.inherits(Entities, ATSDClient);

//Entities: List
Entities.prototype.getAll = function(params, callback) {
  var path = 'entities';

  this.getRequest(path, params, {}, function (data) {
    callback(data);
  });
};

//Entity: Get
Entities.prototype.get = function(params, callback) {
};

//Entity: Create or Replace
Entities.prototype.put = function(params, callback) {
};

//Entity: Update
Entities.prototype.update = function(params, callback) {
};

//Entity: Delete
Entities.prototype.remove = function(params, callback) {
};

//Entity: Property Types
Entities.prototype.getPropertyTypes = function(params, callback) {
};
