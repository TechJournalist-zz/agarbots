/**
 * Logs Manager
 */
var _ = require('lodash');

function LogsManager(tree) {
  _.bindAll(this);

  this.tree = tree;
  this.initialize();
}
module.exports = LogsManager

LogsManager.prototype.initialize = function initialize() {
  this.playIdCursor = this.tree.select('playId');

  this.isPlayingCursor = this.tree.select('isPlaying');
  this.isPlayingCursor.on('update', this.onUpdateIsPlaying);

  this.logsCursor = this.tree.select('logs');
};

LogsManager.prototype.reset = function reset() {
  this.destroyWebSocket();
  this.createWebSocket();
  this.clearLogs();
};

// TODO(ibash) listen to relevant cursors in the tree

LogsManager.prototype.createWebSocket = function createWebSocket() {
  // TODO(ibash) create a websocket and connect to logs
};

LogsManager.prototype.destroyWebSocket = function destroyWebSocket() {
  // TODO(ibash) this
};

LogsManager.prototype.clearLogs = function clearLogs() {
  this.logsCursor.set([]);
};
