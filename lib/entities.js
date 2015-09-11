var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Entities = exports.Entities = function (options) {
  ATSDClient.call(this, options);
};

util.inherits(Entities, ATSDClient);

// Entities: List
// https://axibase.com/atsd/api/#entities:-list
Entities.prototype.getAll = function (params, callback) {
  var path = 'entities';

  this.getRequest(path, params, {}, function (error, response, body) {
    callback(error, response, body);
  });
};

// Entity: Get
// https://axibase.com/atsd/api/#entity:-get
Entities.prototype.get = function (entity, params, callback) {
  var path = 'entities/' + entity;

  this.getRequest(path, params, {}, function (error, response, body) {
    callback(error, response, body);
  });
};

// Entity: Create or Replace
// https://axibase.com/atsd/api/#entity:-create-or-replace
Entities.prototype.create = function (entity, payload, callback) {
  var path = 'entities/' + entity;

  this.putRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

// Entity: Update
// https://axibase.com/atsd/api/#entity:-update
Entities.prototype.update = function (entity, payload, callback) {
  var path = 'entities/' + entity;

  this.patchRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

// Entity: Delete
// https://axibase.com/atsd/api/#entity:-delete
Entities.prototype.delete = function (entity, callback) {
  var path = 'entities/' + entity;

  this.deleteRequest(path, {}, {}, function (error, response, body) {
    callback(error, response, body);
  });
};

// Entity: Property Types
// https://axibase.com/atsd/api/#entity:-property-types
Entities.prototype.getPropertyTypes = function (entity, params, callback) {
  var path = 'entities/' + entity + '/property-types';

  this.getRequest(path, params, {}, function (error, response, body) {
    callback(error, response, body);
  });
};
