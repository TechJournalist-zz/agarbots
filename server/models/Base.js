var _ = require('lodash');
var MoronModel = require('moron').MoronModel;

function Base() {
  MoronModel.apply(this, arguments);
}
MoronModel.extend(Base);
module.exports = Base;

Base.find = function find(id) {
  id = parseInt(id, 10);
  if (!_.isNumber(id)) {
    throw new Error('id is not a number');
  }

  return this
    .query()
    .where('id', id)
    .first();
};
