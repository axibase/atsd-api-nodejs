var util = require("util");
var _ = require("lodash");

var ATSDClient = require("./client").ATSDClient;

var Series = exports.Series = function (options) {
  ATSDClient.call(this, options);
};

util.inherits(Series, ATSDClient);

// Series: Query
// https://axibase.com/atsd/api/#series:-query
Series.prototype.get = function (payload, callback) {
  var path = "series";

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

Series.prototype.query = function (args, callback) {
  var path = "series";

  args["timeFormat"] = "iso";

  var payload = {
    "queries": [
      args
    ]
  };

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body["series"] !== undefined ? body["series"] : []);
  });
};

Series.prototype.queryDetail = function (metric, entity, tags, startTime, endTime, callback) {
  var path = "series";

  var query = {
    "metric": metric,
    "entity": entity,
    "tags": tags,
    "timeFormat": "iso"
  };

  if (startTime instanceof Date) {
    startTime = startTime.getTime();
  }

  if (endTime instanceof Date) {
    endTime = endTime.getTime();
  }

  query[typeof startTime === "string" ? "startDate" : "startTime"] = startTime;
  query[typeof startTime === "string" ?   "endDate" :   "endTime"] =   endTime;

  var payload = {
    "queries": [
      query
    ]
  };

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body["series"] !== undefined ? body["series"] : []);
  });
};

Series.prototype.queryStatistic = function (metric, entity, tags, startTime, endTime, statistic, period, callback) {
  var path = "series";

  var query = {
    "metric": metric,
    "entity": entity,
    "tags": tags,
    "aggregate": {
      "type": statistic,
      "period": period
    },
    "timeFormat": "iso"
  };

  if (startTime instanceof Date) {
    startTime = startTime.getTime();
  }

  if (endTime instanceof Date) {
    endTime = endTime.getTime();
  }

  query[typeof startTime === "string" ? "startDate" : "startTime"] = startTime;
  query[typeof startTime === "string" ?   "endDate" :   "endTime"] =   endTime;

  var payload = {
    "queries": [
      query
    ]
  };

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body["series"] !== undefined ? body["series"] : []);
  });
};

// Series: Insert
// https://axibase.com/atsd/api/#series:-insert
Series.prototype.insert = function (payload, callback) {
  var path = "series/insert";

  this.postRequest(path, {}, payload, function (error, response, body) {
    callback(error, response, body);
  });
};

Series.prototype.insertData = function (metric, entity, tags, data, callback) {
  var path = "series/insert";

  var payload = [
    {
      "metric": metric,
      "entity": entity,
      "tags": tags,
      "data": data
    }
  ];

  this.postRequest(path, {}, [payload], function (error, response, body) {
    callback(error, response, body);
  });
};

// Series URL: Query
// https://axibase.com/atsd/api/#series-url:-query

// Series CSV: Insert
// https://axibase.com/atsd/api/#series-csv:-insert