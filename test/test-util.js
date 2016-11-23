'use strict';

var ATSDClient = require('../src/lib/atsd-client');
var fs = require('fs');

exports.client = new ATSDClient(JSON.parse(fs.readFileSync(__dirname + '/test-options.json')));

