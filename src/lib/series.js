'use strict';

/**
 * API methods for ATSD Series component
 * @author Igor Shmagrinskiy
 */

var util = require('util');
var ATSDClient = require('./client').ATSDClient;

var Series = exports.Series = function(options) {
    ATSDClient.call(this, options);
};

util.inherits(Series, ATSDClient);

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
 * Simple post to series/query on your atsd instance
 *
 * @param {Array} payload  - body of queries
 * @param {Function} callback function- returned response, error, and body
 */
Series.prototype.query = function(payload, callback) {
    var path = 'series/query';
    for (var i = 0; i < payload.length; i++) {
        payload[i].timeFormat = 'iso';
    }
    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

/**
 * Select a detail query with many params
 *
 * @param {String} metric - name of metric
 * @param {String} entity - name of entity
 * @param {Array} tags - tags dictionary
 * @param {Date} startTime - start time of selected metric
 * @param {Date} endTime - end time of selected metric
 * @param {Function} callback - result callback function with response, error and list of selected series
 */
Series.prototype.queryDetail = function(metric, entity, tags, startTime, endTime, callback) {
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
    this.query(payload, function(error, response, body) {
        callback(error, response, body[0]);
    });
};

/**
 * Special method to select series with statistics param.
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
Series.prototype.queryStatistic = function(metric, entity, tags, startTime, endTime, statistic, period, callback) {
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
    this.query(payload, function(error, response, body) {
        callback(error, response, body[0]);
    });
};

// Series: Insert
// https://axibase.com/atsd/api/#series:-insert
Series.prototype.insert = function(payload, callback) {
    var path = 'series/insert';

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};

Series.prototype.insertData = function(metric, entity, tags, data, callback) {
    var path = 'series/insert';

    var payload = [
        {
            'metric': metric,
            'entity': entity,
            'tags': tags,
            'data': data
        }
    ];

    this.postRequest(path, {}, payload, function(error, response, body) {
        callback(error, response, body);
    });
};
