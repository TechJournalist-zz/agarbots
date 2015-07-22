/**
 * Logs Manager
 */
function LogsManager(tree) {
  this.tree = tree;
  this.initialize();
}
module.exports = LogsManager

LogsManager.prototype.initialize = function initialize() {
  this.playIdCursor = this.tree.select('playId');
  this.isPlayingCursor = this.tree.select('isPlaying');
};

// TODO(ibash) listen to relevant cursors in the tree

// TODO(ibash) create a websocket and connect to logs
