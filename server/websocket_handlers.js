/**
 * websocket_handlers
 *
 * Contains handlers for the websocket server.
 */
var url = require('url');
var UntrustedBot = require('./UntrustedBot');
var db = require('./mockDB');

/**
 * onConnection
 *
 * Handler for when a new websocket connection is made.
 * Currently we'll assume that only the agar viewer will connect here.
 * This looks up the bot using the url query param, and then starts a session,
 * proxying agar messages back to the viewer.
 *
 * @param client
 * @return {undefined}
 */
exports.onConnection = function onConnection(client) {
  var query = url.parse(client.upgradeReq.url, true).query;
  var bot = db.load(query.id);
  if (!bot) {
    console.log('TODO(ibash) handle bot not existing');
    return;
  }

  var untrustedBot = new UntrustedBot(bot.code, client);
  untrustedBot.play();
};
