
/**
 * Module dependencies.
 */
global.CONFIG = require('./config.js');
global.LOGGER = require('./utils/logger');
global.RETURNCODE = require('./utils/returnCode');
var express = require('express')
  , routes = require('./routes');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
var routesMan = require('./routeManage');

// Configuration

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.static(__dirname + '/public'));
  app.use(favicon(path.join(__dirname, 'public/favicon.png')));
  app.use(LOGGER.log4js.connectLogger(LOGGER, CONFIG.log));

// Routes 
routesMan.set(app);

app.listen(1208, function(){
  LOGGER.info("Express server listening on port %d", 1208);
});
