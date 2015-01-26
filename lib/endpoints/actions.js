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

var child_process = require('child_process');
var fs = require('fs');

var time = require('../utils/time');
var sprintf = require('sprintf').sprintf;

function restart(req, res) {
  var server = require('../server').server;
  var cmd, args, options;

  cmd = process.argv[0];
  args = process.argv.splice(1);
  options = {'detached': true, 'stdio': ['ignore', 'ignore', 'ignore']};

  server.close();
  child_process.spawn(cmd, args, options);

  setTimeout(function() {
    res.redirect('/');
    process.exit(0);
  }, 1500);
};


function shutdown(req, res) {
  res.send('Application has been shut down');
  process.exit(1);
}


function errorResponse(req, res) {
  var status_code = req.query.status_code || 500;

  status_code = parseInt(status_code, 10);
  res.status(status_code).send(sprintf('Sent %s status code', status_code));
}


function simulateLoad(req, res) {
  var x, i, elapsed, block_time;

  block_time = req.query.block_time || 10; // How long to simulate load for in seconds

  x = 0;
  count = 100000
  elapsed = 0;

  start_time = time.getUnixTimestamp();
  end_time = (start_time + block_time);
  res.send(sprintf('Simulating full core utilization for %s seconds.', block_time));

  now = start_time;
  while (now < end_time) {
    x = x + 1;
    now = time.getUnixTimestamp();
  }
}


function register(app) {
  app.get('/actions/restart', restart);
  app.get('/actions/shutdown', shutdown);
  app.get('/actions/error-response', errorResponse);
  app.get('/actions/simulate-load', simulateLoad);
}


exports.register = register;
