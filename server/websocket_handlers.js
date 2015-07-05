/**
 * websocket_handlers
 *
 * Contains handlers for the websocket server.
 */
var url = require('url');
var Play = require('./models/Play');
var UntrustedBot = require('./UntrustedBot');

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
  var query = url.parse(client.upgradeReq.url, true).query;
  Play
    .find(query.play_id)
    .then(function(play) {
      var untrustedBot = new UntrustedBot(play.code, client);
      untrustedBot.play();
    });
    // TODO(ibash) handle error / bot not found
};
