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

var fs = require('fs');
var path = require('path');

var DEFAULT_CONFIG_PATH = path.resolve(__dirname, '../../config.json');
var config_obj = null;

exports.getConfig = function() {
  var config_path, config, flagIndex;

  if (config_obj) {
    return config_obj;
  }

  flag_index = process.argv.indexOf('--config');
  if (flag_index !== -1) {
    config_path = path.resolve(process.argv[flag_index + 1]);
  }
  else {
    config_path = DEFAULT_CONFIG_PATH;
  }

  config_obj = JSON.parse(fs.readFileSync(config_path));
  return config_obj;
};
