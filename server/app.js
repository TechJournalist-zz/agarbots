/**
 * app
 *
 * Serves the webapp and handles api routes.
 */
var bodyParser = require('body-parser')
var compression = require('compression');
var cors = require('cors');
var express= require('express');
var path = require('path');
var api = require('./api');

var STATIC_DIR = path.join(__dirname, './../build');

var app = express();
module.exports = app;

//app.enable('trust proxy');

app.use(bodyParser());
app.use(compression());

app.use('/api', api);

app.use('/', express.static(STATIC_DIR, {maxage: 31557600}));

// Any unmatched route gets served the client
app.get('*', function(req, res) {
  res.header('Cache-Control', "max-age=60, must-revalidate, private");
  res.sendFile('index.html', {root: STATIC_DIR});
});
