var util = require('util');
var _ = require('lodash');

var ATSDClient = require('./client').ATSDClient;

var Alerts = exports.Alerts = function (options) {
  ATSDClient.call(this, options);
};

util.inherits(Alerts, ATSDClient);

// Alerts: Query
// https://axibase.com/atsd/api/#alerts:-query
Alerts.prototype.get = function (payload, callback) {
  var path = 'alerts';

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

// Alerts: Update
// https://axibase.com/atsd/api/#alerts:-update
Alerts.prototype.update = function (payload, callback) {
  var path = 'alerts';

  this.patchRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

// Alerts: History Query
// https://axibase.com/atsd/api/#alerts:-history-query
Alerts.prototype.getHistory = function (payload, callback) {
  var path = 'alerts/history';

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};