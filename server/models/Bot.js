var MoronModel = require('moron').MoronModel;

function Bot() {
  MoronModel.apply(this, arguments);
}
MoronModel.extend(Bot);
module.exports = Bot;

Bot.tableName = 'bots';

Bot.find = function find(id) {
  return Bot
    .query()
    .where('id', id)
    .first();
};

Bot.create = function create(json) {
  return Bot
    .query()
    .insert({code: json.code});
};
