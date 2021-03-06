'use strict';

var util = require('util');
var HttpClient = require('./client').HttpClient;

var Series = exports.Series = function (options) {
    HttpClient.call(this, options);
};

util.inherits(Series, HttpClient);

Series.statistic = {
    COUNT: 'COUNT',
    MIN: 'MIN',
    MAX: 'MAX',
    AVG: 'AVG',
    SUM: 'SUM',
    PERCENTILE_999: 'PERCENTILE_999',
    PERCENTILE_995: 'PERCENTILE_995',
    PERCENTILE_99: 'PERCENTILE_99',
    PERCENTILE_95: 'PERCENTILE_95',
    PERCENTILE_90: 'PERCENTILE_90',
    PERCENTILE_75: 'PERCENTILE_75',
    PERCENTILE_50: 'PERCENTILE_50',
    MEDIAN: 'MEDIAN',
    STANDARD_DEVIATION: 'STANDARD_DEVIATION',
    MIN_VALUE_TIME: 'MIN_VALUE_TIME',
    MAX_VALUE_TIME: 'MAX_VALUE_TIME'
};

Series.unit = {
    MILLISECOND: 'MILLISECOND',
    SECOND: 'SECOND',
    MINUTE: 'MINUTE',
    HOUR: 'HOUR',
    DAY: 'DAY',
    WEEK: 'WEEK',
    MONTH: 'MONTH',
    QUARTER: 'QUARTER',
    YEAR: 'YEAR'
};

/**
 * Retrieve series objects containing time:value arrays for specified filters
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/series/query.md Series Query}
 *
 * @param {Array} payload  - body of queries
 * @param {Function} callback function- returned response, error, and body
 */
Series.prototype.query = function (payload, callback) {
    var path = 'series/query';
    this.postRequest(path, {}, payload, function (error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Select a detail query with many params
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/series/query.md Series Query}
 *
 * @param {String} metric - name of metric
 * @param {String} entity - name of entity
 * @param {Array} tags - tags dictionary
 * @param {Date} startTime - start time of selected metric
 * @param {Date} endTime - end time of selected metric
 * @param {Function} callback - result callback function with response, error and list of selected series
 */
Series.prototype.queryDetail = function (metric, entity, tags, startTime, endTime, callback) {
    var q = {
        metric: metric,
        entity: entity,
        tags: tags
    };

    if (startTime instanceof Date) {
        startTime = startTime.getTime();
    }

    if (endTime instanceof Date) {
        endTime = endTime.getTime();
    }

    q[typeof startTime === 'string' ? 'startDate' : 'startTime'] = startTime;
    q[typeof startTime === 'string' ? 'endDate' : 'endTime'] = endTime;

    var payload = [];

    payload.push(q);
    this.query(payload, function (error, response, body) {
        callback(error, response, body[0]);
    });
};

/**
 * Special method to select series with statistics param.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/series/query.md Series Query}
 *
 * @param {String} metric - name of metric
 * @param {String} entity - name of entity
 * @param {Object}tags -  tags dictionary
 * @param {Date} startTime -
 * @param {Date} endTime
 * @param {String} statistic
 * @param {String} period
 * @param {Function} callback
 */
Series.prototype.queryStatistic = function (metric, entity, tags, startTime, endTime, statistic, period, callback) {
    var q = {
        'metric': metric,
        'entity': entity,
        'tags': tags,
        'aggregate': {
            'type': statistic,
            'period': period
        },
        'timeFormat': 'iso'
    };

    if (startTime instanceof Date) {
        startTime = startTime.getTime();
    }

    if (endTime instanceof Date) {
        endTime = endTime.getTime();
    }

    q[typeof startTime === 'string' ? 'startDate' : 'startTime'] = startTime;
    q[typeof startTime === 'string' ? 'endDate' : 'endTime'] = endTime;

    var payload = [];
    payload.push(q);
    this.query(payload, function (error, response, body) {
        callback(error, response, body[0]);
    });
};

/**
 * Insert a timestamped array of numeric samples for a given metric, entity, and series tags.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/series/insert.md Series Insert}
 *
 * @param {Object} payload
 * @param {Function} callback
 */
Series.prototype.insert = function (payload, callback) {
    var path = 'series/insert';

    this.postRequest(path, {}, payload, function (error, response, body) {
        callback(error, response, body);
    });
};

/**
 * /**
 * Insert a timestamped array of numeric samples for a given metric, entity, and series tags.
 * {@link https://github.com/axibase/atsd-docs/blob/master/api/data/series/insert.md Series Insert}
 *
 * @param {Strting} metric - name of metric
 * @param {String} entity - name of entity
 * @param {Object} tags - tags dicrionary
 * @param {Object} data - array of added metric
 * @param {Function} callback - result callback function
 */
Series.prototype.insertData = function (metric, entity, tags, data, callback) {
    var payload = [
        {
            metric: metric,
            entity: entity,
            tags: tags,
            data: data
        }
    ];

    this.insert(payload, function (error, response, body) {
        callback(error, response, body);
    });
};
