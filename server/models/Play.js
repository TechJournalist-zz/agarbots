var MoronModel = require('moron').MoronModel;

function Play() {
  MoronModel.apply(this, arguments);
}
MoronModel.extend(Play);
module.exports = Play;

Play.tableName = 'plays';

Play.find = function find(id) {
  return Play
    .query()
    .where('id', id)
    .first();
};

Play.create = function create(json) {
  return Play
    .query()
    .insert({code: json.code});
};
