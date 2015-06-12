/**
 * websocket_handlers
 *
 * Contains handlers for the websocket server.
 */
var UntrustedBot = require('./UntrustedBot');

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
  // TODO(ibash) parse url to get bot id
  // TODO(ibash) get code
  console.log(client.upgradeReq.url);
  var code = 'function step(state, controller) {controller.move(0, 0);}'

  var bot = new UntrustedBot(code, client);
  bot.play();
};
