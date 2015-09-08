var _ = require('lodash');
var Client = require('node-rest-client').Client;

exports.ATSDClient = function(host, port, user, password) {
  this.baseUrl = host + ':' + port + '/api/v1/';

  this.client = new Client({
    user: user,
    password: password
  });

  this._paramsToString = function (params) {
    var paramArray = [];

    _.each(params, function (value, key) {
      paramArray.push(key + '=' + value);
    });

    return paramArray.length > 0 ? '?' + paramArray.join('&') : '';
  };

  this._formURL = function (path, params) {
    return this.baseUrl + path + this._paramsToString(params);
  };

  this.request = function (path, params, callback) {
    this.client.get(this._formURL(path, params), function (data, response) {
      callback(data);
    });
  };
};

exports.Metric = function(name, client) {
  this.name = name;
  this.client = client;

  this.getEntitiesAndTags = function (params, callback) {
    var so = this;

    var path = 'metrics/' + so.name + '/entity-and-tags';

    so.client.request(path, params, function (data) {
      var entitiesAndTags = [];

      _.each(data, function (entry) {
        var tags = _.map(entry.tags, function (value, key) {
          return new exports.Tag(key, value, so.client);
        });

        entitiesAndTags.push(
          {
            entity: new exports.Entity(entry.entity, so.client),
            tags: tags
          }
        );
      });

      callback(entitiesAndTags);
    });
  };

  this.getEntities = function (params, callback) {
    var so = this;

    var path = 'metrics/' + so.name + '/entity-and-tags';

    so.client.request(path, params, function (data) {
      var entityNames = [];

      _.each(data, function (entry) {
        entityNames.push(entry.entity);
      });

      entityNames = entityNames.filter(function (elem, pos) {
        return entityNames.indexOf(elem) === pos;
      });

      var entities = [];

      _.each(entityNames, function (entityName) {
        entities.push(new exports.Entity(entityName, so.client));
      });

      callback(entities);
    });
  };

  this.getAllMetrics = function (params, callback) {
    var so = this;

    var path = 'metrics';

    so.client.request(path, params, function (data, response) {
      var metrics = [];

      _.each(data, function (entry) {
        metrics.push(new exports.Metric(entry.name, so.client));
      });

      callback(metrics);
    });
  };
};

exports.Entity = function(name, client) {
  this.name = name;
  this.client = client;

  this.getMetrics = function (params, callback) {
    var so = this;

    var path = so.name !== '' ? 'entities/' + so.name + '/metrics' : 'metrics';

    so.client.request(path, params, function (data, response) {
      var metrics = [];

      _.each(data, function (entry) {
        metrics.push(new exports.Metric(entry.name, so.client));
      });

      callback(metrics);
    });
  };

  this.getAllEntities = function (params, callback) {
    var so = this;

    var path = 'entities';

    so.client.request(path, params, function (data, response) {
      var entities = [];

      _.each(data, function (entry) {
        entities.push(new exports.Metric(entry.name, so.client));
      });

      callback(entities);
    });
  };
};

exports.Tag = function(name, value, client) {
  this.name = name;
  this.value = value;
  this.client = client;
};
