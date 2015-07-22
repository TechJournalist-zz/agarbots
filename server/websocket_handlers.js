/**
 * websocket_handlers
 *
 * Contains handlers for the websocket server.
 */
var _ = require('lodash');
var url = require('url');
var Log = require('./models/Log');
var Play = require('./models/Play');
var UntrustedBot = require('./UntrustedBot');

var SEND_LOGS_TIMEOUT = 1000;

/**
 * onConnection
 *
 * Handler for when a new websocket connection is made.
 * Currently we'll assume that only the agar viewer will connect here.
 * This looks up the play using the url query param, and then starts a session,
 * proxying agar messages back to the viewer.
 *
 * @param client
 * @return {undefined}
 */
exports.onConnection = function onConnection(client) {
  var parsedUrl =  url.parse(client.upgradeReq.url, true);

  if (parsedUrl.pathname === '/play') {
    playGame(client, query.playId);
  } else if (parsedUrl.pathname === '/logs') {
    sendLogs(client, query.playId);
  }
};

function playGame(client, playId) {
  Play
    .find(playId)
    .then(function(play) {
      var untrustedBot = new UntrustedBot(play.code, client);
      untrustedBot.on('log', onLogMessage.bind(null, playId));
      untrustedBot.play();
    });
}

/**
 * onLogMessage
 *
 * @param playId
 * @param ... messages
 */
function onLogMessage(playId) {
  var messages = arguments.slice(1);

  // join the messages into single string to store
  // TODO(ibash) what happens if we try to log an object?
  var stringified = messages.join(',');
  return Log.create(playId, stringified);
}

function sendLogs(client, playId) {
  var lastLogId = -1;

  sendNewLogs();

  function sendNewLogs() {
    Log
      .latest(playId, lastLogId)
      .then(function(logs) {
        var messages = _.pluck(logs, 'message');
        client.send(JSON.stringify(messages));
        console.log('logs');
        console.log(JSON.stringify(messages, null, 2));
        // TODO(ibash) update lastLogId
      });

      // TODO(ibash) error handling

      // TODO(ibash) maybe this should stop looping on some other criteria?
    if (self.client.readyState === WebSocket.OPEN) {
      setTimeout(sendNewLogs, SEND_LOGS_TIMEOUT);
    }
  }
}
