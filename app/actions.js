/**
 * actions
 */
var tree = require('./tree');

module.exports = {
  setCurrentBot: function(id) {
    // TODO(ibash) check if bot is loaded, if not loaded push a
    // {id: id, loading: true} to the tree, and then make a web request to
    // load the bot.
    id = parseInt(id, 10);

    tree.set('currentBotId', id);
  },

  changeCode: function(code) {
    tree.set('editorCode', code);
    tree.commit();
  }

};
