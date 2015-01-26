# StackStorm Demo Webapp

A simple web application used for demonstration purposes in some of the
StackStorm work-flows.

## Requirements

* Node.js >= 0.8

### Configuration

* ``listen.host`` - Server listen hostname or IP.
* ``listen.port`` - Server listen port.
* ``new_relic.app_name`` - New Relic application name.
* ``new_relic.license_key`` - New Relic license key.

## Running the App

```bash
bin/server [--config <path to config.json>]
```

## Endpoints

### GET /actions/restart

Causes the application to restart. New server process is started as a detached
process.

### GET /actions/shutdown

Causes the application process to exit with status code 1.

### GET /actions/simulate-load[?block_time=<seconds>]

Causes the application to block and utilize the core on which it's running for
``block_time`` number of seconds (defaults to ``10``).

### GET /actions/error-response[?status_code=<code>]

This endpoint returns a status code passed in the query string (defaults to ``500``).
