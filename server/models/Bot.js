var _ = require('lodash');
var Base = require('./Base');

function Bot() {
  Base.apply(this, arguments);
}
Base.extend(Bot);
module.exports = Bot;

Bot.tableName = 'bots';

Bot.create = function create(json) {
  return Bot
    .query()
    .insert({code: json.code});
};
