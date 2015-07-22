var _ = require('lodash');
var Base = require('./Base');

function Log() {
  Base.apply(this, arguments);
}
Base.extend(Log);
module.exports = Log;

Log.tableName = 'logs';

Log.latest = function latest(playId, lastLogId) {
  playId = this.validateId(playId);
  lastLogId = this.validateId(lastLogId);

  return Log
    .query()
    .where('play_id', playId)
    .where('id', '>' , lastLogId);
};
