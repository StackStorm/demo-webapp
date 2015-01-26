/*
 * Licensed to StackStorm, Inc ('StackStorm') under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * StackStorm licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var path = require('path');

var express = require('express');
var newrelic = require('newrelic');

var time = require('./utils/time');
var config = require('./utils/config').getConfig();
var ENDPOINT_MODULES = require('./endpoints/index').ENDPOINT_MODULES;

var app = express();
app.set('view engine', 'jade');
app.use('/static', express.static(path.resolve(__dirname + '/static')));
app.locals.newrelic = newrelic;

exports.server = null;
exports.app = app;

function run() {
  ENDPOINT_MODULES.forEach(function(module_name) {
    var module = require('./endpoints/' + module_name);
    module.register(app);
  });


  exports.server = app.listen(config.listen.port, config.listen.hostname, function() {
    var host = exports.server.address().address
    var port = exports.server.address().port

    console.log('Demo app listening on http://%s:%s', host, port)
  });
};


exports.run = run;
