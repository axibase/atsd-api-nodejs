'use strict';

/**
 * @author Igor Shmagrinskiy
 */

var util = require('util');

var ATSDClient = require('./client').ATSDClient;

var Properties = exports.Properties = function (options) {
    ATSDClient.call(this, options);
};

var propertiesPath = 'properties';
util.inherits(Properties, ATSDClient);

/**
 * Retrieve property records matching specified filters.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/properties/query.md Properties Query}
 *
 * @param {Object} payload - request body
 * @param {Function} callback - result function
 */
Properties.prototype.query = function (payload, callback) {
    var path = propertiesPath + '/query';

    this.postRequest(path, {}, payload, function (error, response, body) {
        callback(error, response, body);
    });
};

/**
 *  Returns an array of property types for the entity.
 *  {@link https://github.com/axibase/atsd-docs/blob/master/api/data/properties/type-query.md Type Query}
 *
 * @param {String} entity - name of entity
 * @param {Function} callback - result function
 */
Properties.prototype.typeQuery = function (entity, callback) {
    var path = propertiesPath + '/' + entity + '/types';

    this.getRequest(path, {}, {}, function (error, response, body) {
        callback(error, response, body);
    });
};

/**
 *  Returns an array of property types for the entity.
 *  {@link https://github.com/axibase/atsd-docs/blob/master/api/data/properties/type-query.md Type Query}
 *
 * @param {String} entity - name of entity
 * @param {Function} callback - result function
 * @private
 */

Properties.prototype.getPropertyTypes = function (entity, callback) {
    var path = propertiesPath + '/' + entity + '/types';

    this.getRequest(path, {}, {}, function (error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Insert an array of alerts.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/properties/insert.md Insert}
 *
 * @param {Object} payload - body of the request
 * @param {Function} callback - result function
 */
Properties.prototype.insert = function (payload, callback) {
    var path = propertiesPath + '/insert';

    this.postRequest(path, {}, payload, function (error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Delete property records that match specified filters.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/properties/delete.md Delete}
 *
 * @param {Object} payload
 * @param {Function} callback
 */
Properties.prototype.delete = function (payload, callback) {
    var path = propertiesPath + '/delete';

    this.postRequest(path, {}, payload, function (error, response, body) {
        callback(error, response, body);
    });
};
