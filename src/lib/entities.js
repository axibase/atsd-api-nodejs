'use strict';
/**
 * @ author Igor Shmagrinskiy
 */
var util = require('util');
var ATSDClient = require('./client').ATSDClient;
exports.Entities = Entities;
var entitiesPath = 'entities';

/**
 * Class implements all methods available in EntitiesAPI
 *
 * @class
 * @param {Object} options
 * @constructor
 */
function Entities(options) {
    ATSDClient.call(this, options);
}

util.inherits(Entities, ATSDClient);

/**
 * Retrieve all entities available in your ATSD instance
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity/list.md List}
 *
 * @param {Function} callback result function
 */
Entities.prototype.list = function(callback) {
    var path = entitiesPath;

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Retrieve propertiesMethod and tags for the specified entity.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity/get.md Get}
 *
 * @param {String} entity name of entity
 * @param {Function} callback result function
 */
Entities.prototype.get = function(entity, callback) {
    var path = 'entities/' + entity;

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Create an entity with specified propertiesMethod and tags or replace
 * the propertiesMethod and tags of an existing entity.
 * This method creates a new entity or replaces the propertiesMethod and tags of an existing entity.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity/create-or-replace.md Create or Replace}
 *
 * @param {String} entity
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
Entities.prototype.create = function(entity, payload, callback) {
    var path = 'entities/' + entity;

    this.putRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Update specified propertiesMethod and tags for the given entity.
 * PATCH method updates specified propertiesMethod and tags for an existing entity.
 * Properties and tags that are not specified are left unchanged.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity/update.md Update}
 *
 * @param {String} entity
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
Entities.prototype.update = function(entity, payload, callback) {
    var path = 'entities/' + entity;

    this.patchRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Delete the entity. Delete the entity from any Entity Groups that it belongs to.
 * Data collected by the entity will be removed asynchronously in the background.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity/delete.md Delete}
 *
 * @param {String} entity
 * @param {Function} callback result function
 */
Entities.prototype.delete = function(entity, callback) {
    var path = 'entities/' + entity;

    this.deleteRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};
