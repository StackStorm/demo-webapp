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

var os = require('os');

var sprintf = require('sprintf').sprintf;

var time = require('../utils/time');


var started_at = time.getUnixTimestamp();


function index(req, res) {
  var now, uptime, context, total_memory, used_memory, load_average;

  now = time.getUnixTimestamp();
  uptime = (now - started_at);

  load_average = os.loadavg()
  load_average = load_average.map(function(value) {
    return value.toFixed(2);
  });
  load_average = load_average.join(' ');
  total_memory = (os.totalmem() / 1024 / 1024).toFixed(2);
  used_memory = ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2);

  context = {
    'title': 'StackStorm Demo App',
    'uptime': uptime,
    'hostname': os.hostname(),
    'platform': os.platform(),
    'cpus': sprintf('%s x %s', os.cpus().length, os.cpus()[0].model),
    'load_avg': load_average,
    'total_memory': total_memory,
    'used_memory': used_memory
  };

  res.render('index.jade', context);
}


function register(app) {
  app.get('/', index);
}


exports.register = register;
