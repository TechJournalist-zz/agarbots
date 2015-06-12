// Mock db for use while developing
function MockDB() {
  this.bots = {};
  this.autoIncrementId = 0;
}
module.exports = MockDB;

MockDB.prototype.save = function save(bot) {
  this.bots[bot.id] = bot;
};

MockDB.prototype.saveNew = function saveNew(bot) {
  var id = this.autoIncrementId;
  this.autoIncrementId++;
  bot.id = id;
  this.save(bot);
  return bot;
};

MockDB.prototype.load = function load(id) {
  return this.bots[id];
};
