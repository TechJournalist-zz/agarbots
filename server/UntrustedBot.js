/**
 * UntrustedBot
 *
 * Runs an agar.io bot.
 *
 * Useage:
 *   bot = new UntrustedBot(code, client);
 *   bot.play();
 */
var _ = require('lodash');
var WebSocket = require('ws');
var events = require('events');
var fs = require('fs');
var jailed = require('jailed');
var path = require('path');
var util = require('util');
var AgarBackend = require('agar').AgarBackend;
var GameState = require('agar').GameState;
var Controller = require('agar').Controller;
var Agent = require('agar').Agent;

var pluginCode = fs.readFileSync(path.join(__dirname, 'plugin.js'), 'utf8');

/**
 * UntrustedBot
 *
 * @param {String} code Bot code to run.
 * @param {[WebSocket]} client Optional websocket client. If provided will
 *   forward weboscket mesages to it.
 * @return {undefined}
 */
function UntrustedBot(code, client) {
  _.bindAll(this);
  events.EventEmitter.call(this);

  this.code = code;
  this.client = client;
  this.isInit = false;
}
util.inherits(UntrustedBot, events.EventEmitter);
module.exports = UntrustedBot;

/**
 * init
 *
 * Initializes agar objects and jailed environment.
 *
 * @return {undefined}
 */
UntrustedBot.prototype.init = function init() {
  if (this.isInit) {
    return;
  }

  var self = this;

  // TODO(ibash) handle disconnecting? Maybe when client disconnects?

  // Initialize backend, game state, and controller.
  this.backend = new AgarBackend();
  this.state = new GameState(this.backend);
  this.controller = new Controller(this.backend);
  this.agent = new Agent(this.state, this.controller);
  this.agent.setStep(this.step);

  // Proxy messages from backend.
  if (this.client) {
    this.backend.on('message', function(data) {
      if (self.client.readyState === WebSocket.OPEN) {
        self.client.send(data);
      }
    });
  }

  // Initialize the jailed environment.
  var jailedController = {
    move: this.controller.move,
    // TODO(ibash) get a better way of doing logging
    log: this.handleLog
  };
  var code = pluginCode + '\n' + this.code;
  this.plugin = new jailed.DynamicPlugin(code, jailedController);
};

/**
 * play
 *
 * Starts a session of agar.io.
 *
 * @return {undefined}
 */
UntrustedBot.prototype.play = function play() {
  var self = this;

  this.init();

  // TODO(ibash) make it so we can call .play twice( i.e. if it's already
  // connected...
  this.plugin.whenConnected(function() {
    self.backend.connect();

    // Kind of lame, but we need to wait for the boardSize event or the play
    // event does not register.
    self.backend.on('boardSize', function() {
      self.controller.play();
      self.agent.run();
    });
  });
};

/**
 * step
 *
 * Forwards the state to the jailed environment so the bot can take action.
 *
 * @param state
 * @param controller
 * @return {undefined}
 */
UntrustedBot.prototype.step = function step(state, controller) {
  this.plugin.remote.step(state.toJSON());
};

UntrustedBot.prototype.handleLog = function handleLog() {
  this.emit('log', _.values(arguments));
};
