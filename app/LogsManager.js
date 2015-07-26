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
  this.isPlayingCursor = this.tree.select('isPlaying');
  this.isPlayingCursor.on('update', this.onUpdateIsPlaying);
  this.logsCursor = this.tree.select('logs');
};

LogsManager.prototype.onUpdateIsPlaying = function onUpdateIsPlaying(event) {
  // if isPlaying changed from falsey to true
  if (!event.data.previousData && event.data.data) {
    this.reset();
  }
};

LogsManager.prototype.reset = function reset() {
  this.destroyWebSocket();
  this.createWebSocket();
  this.clearLogs();
};

// TODO(ibash) make a urls.js to hold the socket url
LogsManager.prototype.createWebSocket = function createWebSocket() {
  var protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  //var address = protocol + '//' + window.location.host + '/logs?playId=' + this.getPlayId();
  var address = protocol + '//localhost:5000/logs?playId=' + this.getPlayId();

  this.socket = new WebSocket(address);
  this.socket.onmessage = this.onSocketMessage;
};

LogsManager.prototype.destroyWebSocket = function destroyWebSocket() {
  if (this.socket) {
    this.socket.onmessage = null;
    this.socket.close();
    delete this.socket;
  }
};

LogsManager.prototype.onSocketMessage = function onSocketMessage(event) {
  var self = this;
  var logs = JSON.parse(event.data);
  _.each(logs, function(log) {
    self.logsCursor.push(log);
  });
};

LogsManager.prototype.clearLogs = function clearLogs() {
  this.logsCursor.set([]);
};

LogsManager.prototype.getPlayId = function getPlayId() {
  var playId = this.tree.get('playId');
  if (!playId) {
    throw new Error('play id is invalid');
  }
  return playId;
};
