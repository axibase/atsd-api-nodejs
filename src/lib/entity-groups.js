/**
 * Created by shmgrinsky on 09.06.16.
 */
'use strict';

var util = require('util');
var HttpClient = require('./client').HttpClient;
exports.EntityGroups = EntityGroups;
var METHOD = HttpClient.METHOD;
var format = require('string-format');
var _this;
/**
 * Class implements all METHOD available in EntitiesAPI
 *
 * @class
 * @param {Object} options
 * @constructor
 */
function EntityGroups(options) {
    HttpClient.call(this, options);
    _this = this;
}

util.inherits(EntityGroups, HttpClient);

/**
 * Retrieve all entity groups available in your ATSD instance
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/list.md List}
 *
 * @param {Function} callback result function
 */
EntityGroups.prototype.list = function (callback, params) {
    methodTemplate(METHOD.GET, '', false, params, {}, callback);
};

/**
 * Displays entity group propertiesMethod and all tags.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/get.md Get}
 *
 * @param {String} entityGroup name of entity group
 * @param {Function} callback result function
 */
EntityGroups.prototype.get = function (entityGroup, callback) {
    methodTemplate(METHOD.GET, entityGroup, false, {}, {}, callback);
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
EntityGroups.prototype.create = function (entityGroup, payload, callback) {
    methodTemplate(METHOD.PUT, entityGroup, false, {}, payload, callback);
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
EntityGroups.prototype.update = function (entityGroup, payload, callback) {
    methodTemplate(METHOD.PATCH, entityGroup, false, {}, payload, callback);
};

/**
 * Delete the entity group.
 * Entities that are members of the group are retained.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/delete.md Delete}
 *
 * @param {String} entityGroup name of entity group
 * @param {Function} callback result function
 */
EntityGroups.prototype.delete = function (entityGroup, callback) {
    methodTemplate(METHOD.DELETE, entityGroup, false, {}, {}, callback);
};

/**
 * Get entities for specified entity group
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/get-entities.md getEntities}
 *
 * @param {String} entityGroup name of entity group
 * @param {Function} callback result function
 */
EntityGroups.prototype.getEntities = function (entityGroup, callback) {
    methodTemplate(METHOD.GET, entityGroup, true, {}, {}, callback);
};

/**
 * Add specified entities to entity group.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/add-entities.md addEntities}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.addEntities = function (entityGroup, payload, callback) {
    methodTemplate(METHOD.POST, entityGroup, true, {}, payload, callback, 'add');
};

/**
 * Replace entities in the entity group with the specified collection.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/replace-entities.md Replace}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.replaceEntities = function (entityGroup, payload, callback) {
    methodTemplate(METHOD.PATCH, true, payload, callback, 'replace');
};

/**
 * Delete entities from entity group.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/meta/entity-group/delete-entities.md Replace}
 *
 * @param {String} entityGroup name of entity group
 * @param {Object} payload body of request
 * @param {Function} callback result function
 */
EntityGroups.prototype.deleteEntities = function (entityGroup, payload, callback) {
    methodTemplate(METHOD.DELETE, entityGroup, true, {}, payload, callback, 'delete');
};

function methodTemplate(method, entityGroup, isEntitiesEdit, params,
                        payload, callback, action) {
    var path = pathTemplate(entityGroup, isEntitiesEdit, action);
    _this.request(method, path, params, payload, function (err, response, body) {
        callback(err, response, body);
    });
}

function pathTemplate(entityGroup, isEntity, action) {
    var entityGroupPath = format('entity-groups/{}', entityGroup);
    return (isEntity) ? format('{}/entities/{}', entityGroupPath, action) : entityGroupPath;
}
