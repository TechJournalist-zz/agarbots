/**
 * api
 */
var cors = require('cors');
var express= require('express');
var Bot = require('./models/Bot');
var Play = require('./models/Play');

var api = express();
module.exports = api;

api.get('/bots/:id', cors(), getBot);
api.post('/bots', cors(), saveBot);

api.post('/plays', cors(), savePlay);

function getBot(req, res, next) {
  console.log('got a bot request');
  console.log(req.params.id);
  Bot
    .find(req.params.id)
    .then(function(bot) {
      if (bot) {
        res.json(bot);
      } else {
        res.send(404);
      }
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

function savePlay(req, res, next) {
  Play
    .create(req.body)
    .then(function(play) {
      res.json(play);
    });
    // TODO(ibash) handle error
};
