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
var db = require('./mockDB');

var STATIC_DIR = path.join(__dirname, './../build');

var app = express();
module.exports = app;

//app.enable('trust proxy');

app.use(bodyParser());
app.use(compression());

app.get('/api/bots/inspect', cors(), inspect);
app.get('/api/bots/:id', cors(), getBot);
app.post('/api/bots', cors(), saveBot);

// TODO(ibash) make this work with history location
app.get('/', function(req, res) {
  res.header('Cache-Control', "max-age=60, must-revalidate, private");
  res.sendFile('index.html', {root: STATIC_DIR});
});

app.use('/', express.static(STATIC_DIR, {maxage: 31557600}));

function inspect(req, res, next) {
  res.json(db.bots);
};

function getBot(req, res, next) {
  var bot = db.load(req.params.id);
  res.json(bot);
};

function saveBot(req, res, next) {
  var bot = db.saveNew(req.body);
  res.json(bot);
};
