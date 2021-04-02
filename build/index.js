'use strict';
var express = require('express');
var app = express();
var port = 8010;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
var buildSchemas = require('./schemas');
db.serialize(function () {
    buildSchemas(db);
    var app = require('./app')(db);
    app.listen(port, function () { return console.log("App started and listening on port " + port); });
});
