'use strict';
var Alerts = require('./alerts').Alerts;
var Messages = require('./messages').Messages;
var Series = require('./series').Series;
var Properties = require('./properties').Properties;
var Entities = require('./entities').Entities;
var Metrics = require('./metrics').Metrics;
var EntityGroups = require('./entity-groups').EntityGroups;

function ATSDClient(options) {
    this.data = {
        alerts: new Alerts(options),
        messages: createMethod(Messages),
        series: createMethod(Series),
        properties: createMethod(Properties)
    };

    this.metaData = {
        entities: createMethod(Entities),
        metrics: createMethod(Metrics),
        entityGroups: createMethod(EntityGroups)
    };

    function createMethod(Method) {
        return new Method(options);
    }
}

module.exports = ATSDClient;
