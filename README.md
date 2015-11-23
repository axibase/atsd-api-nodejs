# ATSD Node.js API client

The ATSD API Client for Node.js enables developers to easily interact with Axibase Time-Series Database, making use of [its advanced API](https://axibase.com/atsd/api/).

## Installation

This client can be installed using npm:

```
$ sudo npm install atsd-api-nodejs
```

## Usage

### ATSD Client

The base class is `ATSDClient`, an instance of which can be created using `ATSDClient(options)` where `options` is an object:

 Key         | Description                         | Required
-------------|-------------------------------------|-----------------------
 `url`       | full ATSD url with port             | yes
 `user`      | username                            | yes
 `password`  | password                            | yes
 `strictSSL` | requires SSL certificate validation | no, `true` by default

The purpose of `ATSDClient` is to make general requests to ATSD. It has an asynchronous method `request` as well as separate methods for each type of request:

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
 `method`   | string                          | request method: `GET`, `POST`, `PUT`, `PATCH` or `DELETE`
 `path`     | string                          | path to be added to base ATSD url, e.g. `metrics` turns into `atsd_server/api/v1/metrics`
 `params`   | object                          | url query string parameters
 `payload`  | object                          | json request paylod 
 `callback` | function(error, response, body) | callback function

### API Methods

`Entities`, `Metrics`, `Properties`, `Alerts` and `Series` are all subclasses of `ATSDClient` and use the same constructor. They hold the implementations of [ATSD API methods](https://axibase.com/atsd/api/):

 API method                                                                                                   | Client function
--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------
 **Series**                                                                                                   | `Series(options)`
 [Series: Query](https://axibase.com/atsd/api/#series:-query)                                                 | `Series.get(payload, callback)`
 [Series: Insert](https://axibase.com/atsd/api/#series:-insert)                                               | `Series.insert(payload, callback)`
 **Alerts**                                                                                                   | `Alerts(options)`
 [Alerts: Query](https://axibase.com/atsd/api/#alerts:-query)                                                 | `Alerts.get(payload, callback)`
 [Alerts: Update](https://axibase.com/atsd/api/#alerts:-update)                                               | `Alerts.update(payload, callback)`
 [Alerts: History Query](https://axibase.com/atsd/api/#alerts:-history-query)                                 | `Alerts.getHistory(payload, callback)`
 **Entities**                                                                                                 | `Entities(options)`
 [Entities: List](https://axibase.com/atsd/api/#entities:-list)                                               | `Entities.getAll(params, callback)`
 [Entity: Get](https://axibase.com/atsd/api/#entity:-get)                                                     | `Entities.get(entity, params, callback)`
 [Entity: Create or Replace](https://axibase.com/atsd/api/#entity:-create-or-replace)                         | `Entities.create(entity, payload, callback)`
 [Entity: Update](https://axibase.com/atsd/api/#entity:-update)                                               | `Entities.update(entity, payload, callback)`
 [Entity: Delete](https://axibase.com/atsd/api/#entity:-delete)                                               | `Entities.delete(entity, callback)`
 [Entity: Property Types](https://axibase.com/atsd/api/#entity:-property-types)                               | `Entities.getPropertyTypes(entity, params, callback)`
 **Metrics**                                                                                                  | `Metrics(options)`
 [Metrics: List](https://axibase.com/atsd/api/#metrics:-list)                                                 | `Metrics.getAll(params, callback)`
 [Metrics: Entity](https://axibase.com/atsd/api/#metrics:-entity)                                             | `Metrics.getByEntity(entity, params, callback)`
 [Metric: Get](https://axibase.com/atsd/api/#metric:-get)                                                     | `Metrics.get(metric, params, callback)`
 [Metric: Create or Replace](https://axibase.com/atsd/api/#metric:-create-or-replace)                         | `Metrics.create(metric, payload, callback)`
 [Metric: Update](https://axibase.com/atsd/api/#metric:-update)                                               | `Metrics.update(metric, payload, callback)`
 [Metric: Delete](https://axibase.com/atsd/api/#metric:-delete)                                               | `Metrics.delete(metric, callback)`
 [Metric: Entities and Tags](https://axibase.com/atsd/api/#metric:-entities-and-tags)                         | `Metrics.getEntitiesAndTags(metric, params, callback)`
 **Properties**                                                                                               | `Properties(options)`
 [Properties: Query](https://axibase.com/atsd/api/#properties:-query)                                         | `Properties.get(payload, callback)`
 [Properties: Query for Entity and Type](https://axibase.com/atsd/api/#properties:-query-for-entity-and-type) | `Properties.getByEntityAndType(entity, type, params, callback)`
 [Properties: Property Types](https://axibase.com/atsd/api/#properties:-property-types)                       | `Properties.getPropertyTypes(entity, params, callback)`
 [Properties: Insert](https://axibase.com/atsd/api/#properties:-insert)                                       | `Properties.insert(payload, callback)`
 [Properties: Batch](https://axibase.com/atsd/api/#properties:-batch)                                         | `Properties.batch(payload, callback)`

There is also a number of convenience functions dedicated to making some requests easier to make. Unlike the functions listed above they don't replicate the signatures of ATSD API methods.

 Client function                                                                                | Equivalent to                                                                                                                          | Note
------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------
 `Series.query(args, callback)`                                                                 | `Series.get(payload, callback)` with `payload` being `{'queries': [args]}`                                                             | `timeFormat` for response is set to `iso`; instead of `{'series': [...]}` returns `[...]`
 `Series.queryDetail(metric, entity, tags, startTime, endTime, callback)`                       | `Series.query(args, callback)` with `args` being an object consisting of `metric`, `entity` etc.                                       | `startTime` and `endTime` can be a timestamp in milliseconds, a string (ATSD API's `startDate` and `endDate`) or a Date object
 `Series.queryStatistic(metric, entity, tags, startTime, endTime, statistic, period, callback)` | same as above                                                                                                                          | same as above
 `Series.insertData(metric, entity, tags, data, callback)`                                      | `Series.insert(payload, callback)` with `payload` being `[inserts]` where `inserts` is an object consisting of `metric`, `entity` etc. | 

For statistics and units used to aggregate the data through series queries there exist corresponding "enumerations" in class Series: `Series.statistic` and `Series.unit`.

## Setup

```javascript
var atsd_api = require('atsd-api-nodejs');

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
// inserting series data with versioning
series.insertData('temperature', 'sensor001', {},
  [
    {
      'd': '2015-11-23T08:19:00.000Z',
      'v': 51,
      'version': {
        'status': 'provisional',
        'source': 'gateway-1'
      }
    }
  ],
  function(error_insert, response, _) {
    if (!error_insert) {
      console.log('Insert: ' + response.statusCode);

      // retrieving the same data
      series.queryDetail(
        'temperature', 'sensor001', {},
        'current_hour', 'next_hour',
        function(error_detail, _, body) {
          if (!error_detail) {
            console.log('Detail: ' + JSON.stringify(body));
          }
        }
      );
    }
  }
);
```

```
> Insert: 200
> Detail: [{"entity":"sensor001","metric":"temperature","tags":{},"type":"HISTORY","aggregate":{"type":"DETAIL"},"data":[{"d":"2015-11-23T08:19:00.000Z","v":51,"version":{"source":"gateway-1","status":"provisional"}}]}]
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

### Series dump

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
