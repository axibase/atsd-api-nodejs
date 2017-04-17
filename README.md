[![CircleCI](https://circleci.com/gh/unrealwork/atsd-api-nodejs.svg?style=svg)](https://circleci.com/gh/unrealwork/atsd-api-nodejs) [![Code Climate](https://codeclimate.com/github/unrealwork/atsd-api-nodejs/badges/gpa.svg)](https://codeclimate.com/github/unrealwork/atsd-api-nodejs) [![codecov](https://codecov.io/gh/unrealwork/atsd-api-nodejs/branch/master/graph/badge.svg)](https://codecov.io/gh/unrealwork/atsd-api-nodejs)
# ATSD Node.js API client

The ATSD API Client for Node.js enables developers to easily interact with the Axibase Time Series Database through its [Data](https://github.com/axibase/atsd/tree/master/docs/api/data/README.md) and [Meta](https://github.com/axibase/atsd/tree/master/docs/api/meta/README.md) API.

## Installation

This client can be installed using npm:

```
$ npm install --save atsd-api
```

## Usage

### ATSD Client

The base class is `ATSDClient`, an instance which can be created using `ATSDClient(options)` where `options` is an object:

 Key         | Description                         | Required
-------------|-------------------------------------|-----------------------
 `url`       | full ATSD url with port             | yes
 `user`      | username                            | yes
 `password`  | password                            | yes
 `strictSSL` | requires SSL certificate validation | no, `true` by default

The purpose of `ATSDClient` is to make general requests to ATSD. It has an asynchronous method `request`, as well as separate methods for each type of request:

```
ATSDClient.request(method, path, params, payload, callback)
```

```
ATSDClient.getRequest(path, params, payload, callback)
ATSDClient.postRequest(path, params, payload, callback)
ATSDClient.putRequest(path, params, payload, callback)
ATSDClient.patchRequest(path, params, payload, callback)
ATSDClient.deleteRequest(path, params, payload, callback)
```

The arguments are as follows:

 Argument   | Type                            | Description
------------|---------------------------------|-----------------------------------------------------------------------------------
 `method`   | string                          | Request method: `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
 `path`     | string                          | Path to be added to base ATSD url, i.e. `metrics` turns into `atsd_server/api/v1/metrics`.
 `params`   | object                          | url query string parameters.
 `payload`  | object                          | json request paylod.
 `callback` | function(error, response, body) | Callback function.

### API Methods

`Entities`, `Metrics`, `Properties`, `Alerts`, and `Series` are all subclasses of `ATSDClient` and use the same constructor. They hold the implementations of [ATSD API methods](https://axibase.com/atsd/api/):

#### Data API

 API method                                                                                                   | Client function
--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------
 **Series**                                                                                                   | `Series(options)`
 [Series: Query](https://github.com/axibase/atsd/tree/master/docs/api/data/series/query.md)                   | `Series.query(payload, callback)`
 [Series: Insert](https://github.com/axibase/atsd/tree/master/docs/api/data/series/insert.md)                 | `Series.insert(payload, callback)`
 **Alerts**                                                                                                   | `Alerts(options)`
 [Alerts: Query](https://github.com/axibase/atsd/tree/master/docs/api/data/alerts/query.md)                   | `Alerts.query(payload, callback)`
 [Alerts: Update](https://github.com/axibase/atsd/tree/master/docs/api/data/alerts/update.md)                 | `Alerts.update(payload, callback)`
 [Alerts: History Query](https://github.com/axibase/atsd/tree/master/docs/api/data/alerts/history-query.md)   | `Alerts.historyQuery(payload, callback)`
 [Alerts: Delete](https://github.com/axibase/atsd/tree/master/docs/api/data/alerts/delete.md)                 | `Alerts.delete(payload, callback)`
 **Properties**                                                                                               | `Properties(options)`
 [Properties: Query](https://github.com/axibase/atsd/tree/master/docs/api/data/properties/query.md)           | `Properties.query(payload, callback)`
 [Properties: Type Query](https://github.com/axibase/atsd/tree/master/docs/api/data/properties/type-query.md) | `Properties.typeQuery(payload, callback)`
 [Properties: Insert](https://github.com/axibase/atsd/tree/master/docs/api/data/properties/insert.md)         | `Properties.insert(payload, callback)`
 [Properties: Delete](https://github.com/axibase/atsd/tree/master/docs/api/data/properties/delete.md)         | `Properties.delete(payload, callback)`
 **Messages**                                                                                                 | `Messages(options)`
 [Messages: Query](https://github.com/axibase/atsd/tree/master/docs/api/data/messages/query.md)               | `Messages.query(payload, callback)`
 [Messages: Insert](https://github.com/axibase/atsd/tree/master/docs/api/data/messages/insert.md)             | `Messages.insert(payload, callback)`

#### Meta API

 API method                                                                                                                      | Client function                                                |
-------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
 **Entities**                                                                                                                    | `Entities(options)`                                            |
 [Entities: List](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity/list.md)                                      | `Entities.list(params, callback)`                              |
 [Entity: Get](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity/get.md)                                          | `Entities.get(entity, params, callback)`                       |
 [Entity: Create or Replace](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity/create-or-replace.md)              | `Entities.create(entity, payload, callback)`                   |
 [Entity: Update](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity/update.md)                                    | `Entities.update(entity, payload, callback)`                   |
 [Entity: Delete](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity/delete.md)                                    | `Entities.delete(entity, callback)`                            |
 **Metrics**                                                                                                                     | `Metrics(options)`                                             |
 [Metrics: List](https://github.com/axibase/atsd/tree/master/docs/api/meta/metric/list.md)                                       | `Metrics.list(params, callback)`                               |
 [Metrics: Get](https://github.com/axibase/atsd/tree/master/docs/api/meta/metric/get.md)                                         | `Metrics.get(entity, params, callback)`                        |
 [Metric: Create or Replace](https://github.com/axibase/atsd/tree/master/docs/api/meta/metric/create-or-replace.md)              | `Metrics.create(metric, payload, callback)`                    |
 [Metric: Update](https://github.com/axibase/atsd/tree/master/docs/api/meta/metric/update.md)                                    | `Metrics.update(metric, payload, callback)`                    |
 [Metric: Delete](https://github.com/axibase/atsd/tree/master/docs/api/meta/metric/delete.md)                                    | `Metrics.delete(metric, callback)`                             |
 **Entity Groups**                                                                                                               | `EntityGroups(options)`                                        |
 [Entity Groups: List](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/list.md)                           | `EntityGroups.list(params, callback)`                          |
 [Entity Groups: Get](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/get.md)                             | `EntityGroups.get(entity, params, callback)`                   |
 [Entity Groups: Create or Replace](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/create-or-replace.md) | `EntityGroups.create(entity-group, payload, callback)`         |
 [Entity Groups: Update](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/update.md)                       | `EntityGroups.update(entity-group, payload, callback)`         |
 [Entity Groups: Delete](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/delete.md)                       | `EntityGroups.delete(entity-group, callback)`                  |
 [Entity Groups: GetEntities](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/get-entities.md)            | `EntityGroups.getEntities(entity, params, callback)`           |
 [Entity Groups: AddEntities](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/add-entities.md)            | `EntityGroups.addEntities(entity-group, payload, callback)`    |
 [Entity Groups: ReplaceEntities](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/replace-entities.md)    | `EntityGroups.setEntities(entity-group, payload, callback)`    |
 [Entity Groups: DeleteEntities](https://github.com/axibase/atsd/tree/master/docs/api/meta/entity-group/delete-entities.md)      | `EntityGroups.deleteEntities(entity-group, payload, callback)` |

There is also a number of convenience functions dedicated to making some requests easier to execute. Unlike the functions listed above, they don't replicate the signatures of ATSD API methods.

 Client function                                                                                | Equivalent to                                                                                                                          | Note
------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------
 `Series.query(args, callback)`                                                                 | `Series.get(payload, callback)` with `payload` being `{'queries': [args]}`                                                             | `timeFormat` for response is set to `iso`; instead of `{'series': [...]}` returns `[...]`.
 `Series.queryDetail(metric, entity, tags, startTime, endTime, callback)`                       | `Series.query(args, callback)` with `args` being an object consisting of `metric`, `entity` etc.                                       | `startTime` and `endTime` can be a timestamp in milliseconds, a string (ATSD API's `startDate` and `endDate`), or a Date object.
 `Series.queryStatistic(metric, entity, tags, startTime, endTime, statistic, period, callback)` | Same as above.                                                                                                                          | Same as above.
 `Series.insertData(metric, entity, tags, data, callback)`                                      | `Series.insert(payload, callback)` with `payload` being `[inserts]` where `inserts` is an object consisting of `metric`, `entity` etc. |

For statistics and units used to aggregate the data through series queries, there exist corresponding "enumerations" in class Series: `Series.statistic` and `Series.unit`.

## Setup

```javascript
var atsd_api = require('atsd-api');

var options = {
  url: '...',
  user: '...',
  password: '...'
};

var entities   = new atsd_api.Entities(options);
var metrics    = new atsd_api.Metrics(options);
var series     = new atsd_api.Series(options);
var properties = new atsd_api.Properties(options);
var alerts     = new atsd_api.Alerts(options);
```

## Examples

### Series

```javascript
// inserting series data without versions
series.insertData('temperature', 'sensor001', {}, [
    {'d': '2015-11-23T08:19:00.000Z', 'v': 51},
    {'d': '2015-11-23T08:20:00.000Z', 'v': 52}
  ], function(error_insert, response, _) {
    if (!error_insert) {
      console.log('Insert: ' + response.statusCode);
    }
  }
);
```

```
> Insert: 200
```

```javascript
// inserting series data with versions
series.insertData('temperature', 'sensor001', {}, [
    {'d': '2015-11-23T08:21:00.000Z', 'v': 50, 'version': {'status': 'provisional', 'source': 'gateway-1'}}
  ], function(error_insert, response, _) {
    if (!error_insert) {
      console.log('Insert with versions: ' + response.statusCode);
    }
  }
);
```

```
> Insert with versions: 200
```

```javascript
// retrieving data without versions
series.queryDetail(
  'temperature', 'sensor001', {},
  'current_day', 'next_day',
  function(error_detail, _, body) {
    if (!error_detail) {
      console.log('Detail: ' + JSON.stringify(body));
    }
  }
);
```

```
> Detail: [{"entity":"sensor001","metric":"temperature1","tags":{},"type":"HISTORY","aggregate":{"type":"DETAIL"},"data":[{"d":"2015-11-23T08:19:00.000Z","v":51},{"d":"2015-11-23T08:20:00.000Z","v":52},{"d":"2015-11-23T08:21:00.000Z","v":50}]}]
```

```javascript
// retrieving data with versions
series.query({
    'metric': 'temperature',
    'entity': 'sensor001',
    'startDate': 'current_day',
    'endDate': 'next_day',
    'versioned': true
  }, function(error_detail, _, body) {
    if (!error_detail) {
      console.log('Detail with versions: ' + JSON.stringify(body));
    }
  }
);
```

```
> Detail with versions: [{"entity":"sensor001","metric":"temperature1","tags":{},"type":"HISTORY","aggregate":{"type":"DETAIL"},"data":[{"d":"2015-11-23T08:19:00.000Z","v":51},{"d":"2015-11-23T08:20:00.000Z","v":52},{"d":"2015-11-23T08:21:00.000Z","v":50,"version":{"source":"gateway-1","status":"provisional"}}]}]
```

```javascript
// retrieving yesterday's data averaged by 6 hours
series.queryStatistic(
  'cpu_busy', 'nurswgvml007', {},
  'previous_day', 'current_day',
  Series.statistic.AVG, {'count': 6, 'unit': Series.unit.HOUR},
  function(error, _, body) {
    if (!error) {
      console.log('Average: ' + JSON.stringify(body));
    }
  }
);
```

```
> Average: [{"entity":"nurswgvml007","metric":"cpu_busy","tags":{},"type":"HISTORY","aggregate":{"type":"AVG","period":{"count":6,"unit":"HOUR"}},"data":[{"d":"2015-11-22T00:00:00.000Z","v":18.35364243323441},{"d":"2015-11-22T06:00:00.000Z","v":14.058392592592591},{"d":"2015-11-22T12:00:00.000Z","v":13.460140845070423},{"d":"2015-11-22T18:00:00.000Z","v":13.851594955489615}]}]
```

### Alerts

```javascript
// updating alerts 'evt-1' and 'evt-2'
alerts.update(
  [
    {
      'action': 'update',
      'fields': {
        'acknowledge': true
      },
      'alerts': [
        {'id': 'evt-1'},
        {'id': 'evt-2'}
      ]
    }
  ],
  function(error, response, _) {
    if (!error) {
      console.log('Update: ' + response.statusCode);
    }
  }
);
```

```
> Update: 200
```

### Properties

```javascript
// getting property types of entity 'atsd'
entities.getPropertyTypes('atsd', {}, function (error, _, body) {
  if (!error) {
    console.log('Property types: ' + JSON.stringify(body));
  }
});
```

```
> Property types: ["jfs","system","disk","cpu","java_method","configuration","network"]
```

```javascript
// inserting a property
properties.insert(
  [
    {
      'type':'type-1',
      'entity':'entity-1',
      'key':{'server_name':'server','user_name':'system'},
      'tags':{'name-1': 'value-1'}
    }
  ],
  function(error_insert, response, _) {
    if (!error_insert) {
      console.log('Insert: ' + response.statusCode);

      // retrieving the same property
      properties.getByEntityAndType(
        'entity-1', 'type-1', {},
        function (error_get, _, body) {
          if (!error_get) {
            console.log('Properties by entity and type: ' + JSON.stringify(body));
          }
        }
      );
    }
  }
);
```

```
> Insert: 200
> Properties by entity and type: [{"type":"type-1","entity":"entity-1","key":{"server_name":"server","user_name":"system"},"tags":{"name-1":"value-1","name.1":"value-1"},"timestamp":1448122917843}]
```

### Series Dump

```javascript
entities.getAll({}, function (error_entities, _, body_entities) {
  if (!error_entities) {
    // choosing the first entity
    var entity = body_entities[0]['name'];

    console.log('First entity: ' + entity);

    // retrieving all metrics for that entity
    metrics.getByEntity(entity, {}, function (error_metrics, _, body_metrics) {
      if (!error_metrics) {
        // choosing the first metric
        var metric = body_metrics[0]['name'];

        console.log('First metric: ' + metric);

        // getting data for the chosen entity and metric
        series.queryDetail(
          metric, entity, {},
          'current_hour', 'current_hour + 10 * second',
          function (error_series, _, body_series) {
            if (!error_series) {
              var data = body_series[0]['data'];

              console.log('Data: ' + JSON.stringify(data));
            }
          }
        );
      }
    })
  }
});
```

```
> First entity: atsd
> First metric: actions_per_minute
> Data: [{"d":"2015-11-21T14:00:02.497Z","v":0}]
```
