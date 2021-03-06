var EventEmitter = require('events').EventEmitter,
    WebSocket = require('faye-websocket'),
    http = require('http'),
    express = require('express'),
    expressBasicAuth = require('express-basic-auth'),
    md5,
    usage,
    influx;

try {
    md5 = require('md5');
} catch (error) {
    md5 = false;
}

try {
    usage = require('usage');
} catch (error) {
    usage = false;
}

try {
    influx = require('influx');
} catch (error) {
    influx = false;
}
