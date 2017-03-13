'use strict'

var routes = require('./routes/index.js');


exports.set = function(app) {
    app.get('/', routes.index);
}