
/**
 * Module dependencies.
 */
global.CONFIG = require('./config.js');
global.LOGGER = require('./utils/logger');
global.RETURNCODE = require('./utils/returnCode');
//node_modules
var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var ejs = require('ejs');

var app = express();
//project import
var routesMan = require('./routeManage');

// Configuration
  app.engine('.html', ejs.__express);
  app.engine('.ejs', ejs.__express);
  app.set('port', process.env.PORT || 1208);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.static(__dirname + '/public'));
  app.use(favicon(path.join(__dirname, 'public/favicon.png')));
  app.use(LOGGER.log4js.connectLogger(LOGGER, CONFIG.log));

// Routes 
routesMan.set(app);

app.listen(app.get('port'), function(){
  LOGGER.info("Blogs server listening on port %d", app.get('port'));
});
