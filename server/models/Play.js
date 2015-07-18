var _ = require('lodash');
var Base = require('./Base');

function Play() {
  Base.apply(this, arguments);
}
Base.extend(Play);
module.exports = Play;

Play.tableName = 'plays';

Play.create = function create(json) {
  return Play
    .query()
    .insert({code: json.code});
};
