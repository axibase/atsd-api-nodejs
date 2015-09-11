var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Series = exports.Series = function (options) {
  ATSDClient.call(this, options);
};

util.inherits(Series, ATSDClient);

// Series: Query
// https://axibase.com/atsd/api/#series:-query
Series.prototype.get = function (payload, callback) {
  var path = 'series';

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

// Series: Insert
// https://axibase.com/atsd/api/#series:-insert
Series.prototype.insert = function (payload, callback) {
  var path = 'series/insert';

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

// Series URL: Query
// https://axibase.com/atsd/api/#series-url:-query

// Series CSV: Insert
// https://axibase.com/atsd/api/#series-csv:-insert