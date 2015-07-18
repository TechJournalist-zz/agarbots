/**
 * api
 */
var cors = require('cors');
var express= require('express');
var Bot = require('./models/Bot');
var Play = require('./models/Play');

var api = express();
module.exports = api;

// TODO(ibash) add logging for all requests

api.get('/bots/:id', cors(), getBot);
api.post('/bots', cors(), saveBot);

api.post('/plays', cors(), savePlay);

api.use(errorHandler);

function getBot(req, res, next) {
  Bot
    .find(req.params.id)
    .then(function(bot) {
      if (bot) {
        res.json(bot);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function(error) {
      next(error);
    });
};

function saveBot(req, res, next) {
  Bot
    .create(req.body)
    .then(function(bot) {
      res.json(bot);
    })
    .catch(function(error) {
      next(error);
    });
};

function savePlay(req, res, next) {
  Play
    .create(req.body)
    .then(function(play) {
      res.json(play);
    })
    .catch(function(error) {
      next(error);
    });
};

function errorHandler(error, req, res, next) {
  // TODO(ibash) log this error
  res.sendStatus(500);
}
