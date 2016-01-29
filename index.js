"use strict";

// --- imports
var cfenv         = require("cfenv");
var express       = require('express');
var bodyParser    = require('body-parser')
var Logging       = require('./js/bunyanLogger.js');
var logger        = Logging.logger();

var appEnv = cfenv.getAppEnv();


var PORT = 8080;
(function () {
    if (appEnv.isLocal) {
        var config = require('config');
        PORT = config.get('PORT');

    } else {
        PORT = process.env.PORT;

    }
    logger.trace('Env port is ' + PORT);
})();


(function () {
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));

    app.get('/*', simpleRequest);
    app.put('/*', simpleRequest);
    app.post('/*', simpleRequest);

    function simpleRequest(req, res) {

        logger.debug("Default Request Received: Returning simple response.");
        logger.trace("request body: ",req.body);
        res.json(
            {
              TS_CMDP_DONE : new Date().getTime()
            }
        );
    }

    logger.debug('Express port is ' + PORT);
    var server = app.listen(PORT, function () {
        var host = server.address().address;
        var port = server.address().port;

        logger.debug('Dev server listening at http://%s:%s', host, port);
    });
})();
