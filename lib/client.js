var _ = require('lodash');
var Client = require('node-rest-client').Client;

var ATSDClient = exports.ATSDClient = function(options) {
  this._baseUrl = options.url + '/api/v1/';

  this._client = new Client({
    user: options.user,
    password: options.password
  });
};

ATSDClient.prototype._paramsToString = function (params) {
  var paramArray = [];

  _.each(params, function (value, key) {
    paramArray.push(key + '=' + value);
  });

  return paramArray.length > 0 ? '?' + paramArray.join('&') : '';
};

ATSDClient.prototype._formURL = function (path, params) {
  return this._baseUrl + path + this._paramsToString(params);
};

ATSDClient.prototype.getRequest = function (path, params, payload, callback) {
  this._client.get(this._formURL(path, params), { data: payload }, function (data, response) {
    callback(data);
  });
};

ATSDClient.prototype.postRequest = function (path, params, payload, callback) {
  this._client.post(this._formURL(path, params), { data: payload }, function (data, response) {
    callback(data);
  });
};

ATSDClient.prototype.putRequest = function (path, params, payload, callback) {
  this._client.put(this._formURL(path, params), { data: payload }, function (data, response) {
    callback(data);
  });
};

ATSDClient.prototype.patchRequest = function (path, params, payload, callback) {
  this._client.patch(this._formURL(path, params), { data: payload }, function (data, response) {
    callback(data);
  });
};

ATSDClient.prototype.deleteRequest = function (path, params, payload, callback) {
  this._client.delete(this._formURL(path, params), { data: payload }, function (data, response) {
    callback(data);
  });
};