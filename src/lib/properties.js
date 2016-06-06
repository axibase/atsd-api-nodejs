'use strict';
var util = require('util');

var ATSDClient = require('./client').ATSDClient;

var Properties = exports.Properties = function(options) {
    ATSDClient.call(this, options);
};

util.inherits(Properties, ATSDClient);

// Properties: Query
// https://axibase.com/atsd/api/#properties:-query
Properties.prototype.get = function(payload, callback) {
    var path = 'properties';

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

// Properties: Query for Entity and Type
// https://axibase.com/atsd/api/#properties:-query-for-entity-and-type
Properties.prototype.getByEntityAndType = function(entity, type, params, callback) {
    var path = 'properties/' + entity + '/types/' + type;

    this.getRequest(path, params, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

// Properties: Property Types
// https://axibase.com/atsd/api/#properties:-property-types
Properties.prototype.getPropertyTypes = function(entity, params, callback) {
    var path = 'properties/' + entity + '/types';

    this.getRequest(path, params, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

// Properties: Insert
// https://axibase.com/atsd/api/#properties:-insert
Properties.prototype.insert = function(payload, callback) {
    var path = 'properties/insert';

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

// Properties: Batch
// https://axibase.com/atsd/api/#properties:-batch
Properties.prototype.batch = function(payload, callback) {
    var path = 'properties';

    this.patchRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};
