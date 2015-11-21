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
 **Series**                                                                                                   | `Series(options)`
 [Series: Query](https://axibase.com/atsd/api/#series:-query)                                                 | `Series.get(payload, callback)`
 [Series: Insert](https://axibase.com/atsd/api/#series:-insert)                                               | `Series.insert(payload, callback)`
 [Series URL: Query](https://axibase.com/atsd/api/#series-url:-query)                                         | -
 [Series CSV: Insert](https://axibase.com/atsd/api/#series-csv:-insert)                                       | -
 
## Examples

### Setup

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

### Series

```javascript
// retrieving all entities
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
        series.get(
          {
            "queries": [
              {
                "startDate": "current_hour",
                "endDate": "current_hour + 10 * second",
                "timeFormat": "iso",
                "entity": entity,
                "metric": metric
              }
            ]
          },
          function (error_series, _, body_series) {
            if (!error_series) {
              var data = body_series['series'][0]['data'];
 
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

### Alerts

```javascript
// updating alerts 'evt-1' and 'evt-2'
alerts.update(
  [
    {
      "action": "update",
      "fields": {
        "acknowledge": true
      },
      "alerts": [
        {"id": "evt-1"},
        {"id": "evt-2"}
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
      "type":"type-1",
      "entity":"entity-1",
      "key":{"server_name":"server","user_name":"system"},
      "tags":{"name-1": "value-1"},
      "timestamp":1000
    }
  ],
  function(error_insert, response, _) {
    if (!error_insert) {
      console.log('Insert: ' + response.statusCode);

      // retrieving the same property
      properties.getByEntityAndType("entity-1", "type-1", {}, function (error_get, _, body) {
        if (!error_get) {
          console.log('Properties by entity and type: ' + JSON.stringify(body));
        }
      });
    }
  }
);
```

```
> Insert: 200
> Properties by entity and type: [{"type":"type-1","entity":"entity-1","key":{"server_name":"server","user_name":"system"},"tags":{"name-1":"value-1","name.1":"value-1"},"timestamp":1000}]
```
