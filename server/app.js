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
var Bot = require('./models/Bot');

var STATIC_DIR = path.join(__dirname, './../build');

var app = express();
module.exports = app;

//app.enable('trust proxy');

app.use(bodyParser());
app.use(compression());

app.get('/api/bots/:id', cors(), getBot);
app.post('/api/bots', cors(), saveBot);

app.use('/', express.static(STATIC_DIR, {maxage: 31557600}));

// Any unmatched route gets served the client
app.get('*', function(req, res) {
  res.header('Cache-Control', "max-age=60, must-revalidate, private");
  res.sendFile('index.html', {root: STATIC_DIR});
});

function getBot(req, res, next) {
  Bot
    .find(req.params.id)
    .then(function(bot) {
      res.json(bot);
    });
    // TODO(ibash) handle error
};

function saveBot(req, res, next) {
  Bot
    .create(req.body)
    .then(function(bot) {
      res.json(bot);
    });
    // TODO(ibash) handle error
};
