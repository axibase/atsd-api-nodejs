/**
 * Created by shmgrinsky on 09.06.16.
 */
'use strict';

var util = require('util');
var ATSDClient = require('./client').ATSDClient;
exports.EntityGroups = EntityGroups;
var entitiesPath = 'entity-groups';

/**
 * Class implements all methods available in EntitiesAPI
 *
 * @class
 * @param {Object} options
 * @constructor
 */
function EntityGroups(options) {
    ATSDClient.call(this, options);
}

util.inherits(EntityGroups, ATSDClient);

/**
 * Retrieve all entity groups available in your ATSD instance
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/list.md List}
 *
 * @param {Function} callback result function
 */
EntityGroups.prototype.list = function(callback) {
    this.getRequest(entitiesPath, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Displays entity group propertiesMethod and all tags.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/get.md Get}
 *
 * @param {String} entityGroup name of entity group
 * @param {Function} callback result function
 */
EntityGroups.prototype.get = function(entityGroup, callback) {
    var path = entitiesPath + '/' + entityGroup;

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Create an entity group with specified propertiesMethod and tags or
 * replace propertiesMethod and tags for an existing entity group.
 * This method creates a new entity group or replaces the propertiesMethod and tags of an existing entity group.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/create-or-replace.md Create}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.create = function(entityGroup, payload, callback) {
    var path = entitiesPath + '/' + entityGroup;

    this.putRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Update specified propertiesMethod and tags for the given entity.
 * PATCH method updates specified propertiesMethod and tags for an existing entity.
 * Properties and tags that are not specified are left unchanged.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/update.md Update}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.update = function(entityGroup, payload, callback) {
    var path = entitiesPath + '/' + entityGroup;

    this.patchRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Delete the entity group.
 * Entities that are members of the group are retained.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/delete.md Delete}
 *
 * @param {String} entityGroup name of entity group
 * @param {Function} callback result function
 */
EntityGroups.prototype.delete = function(entityGroup, callback) {
    var path = entitiesPath + '/' + entityGroup;

    this.deleteRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Get entities for specified entity group
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/get-entities.md getEntities}
 *
 * @param {String} entityGroup name of entity group
 * @param {Function} callback result function
 */
EntityGroups.prototype.getEntities = function(entityGroup, callback) {
    var path = entitiesPath + '/' + entityGroup + '/entities';

    this.getRequest(path, {}, {}, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Add specified entities to entity group.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/add-entities.md addEntities}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.addEntities = function(entityGroup, payload, callback) {
    var path = entitiesPath + '/' + entityGroup + '/entities';

    this.patchRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Replace entities in the entity group with the specified collection.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/replace-entities.md Replace}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.replaceEntities = function(entityGroup, payload, callback) {
    var path = entitiesPath + '/' + entityGroup + '/entities';

    this.putRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Delete entities from entity group.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/delete-entities.md Replace}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.deleteEntities = function(entityGroup, payload, callback) {
    var path = entitiesPath + '/' + entityGroup + '/entities';

    this.patchRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};
