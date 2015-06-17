/**
 * actions
 */
var api = require('./api');
var tree = require('./tree');

module.exports = {
  setCurrentBot: function(id) {
    // TODO(ibash) check if bot is loaded, if not loaded push a
    // {id: id, loading: true} to the tree, and then make a web request to
    // load the bot.
    tree.set('currentBotId', id);
  },

  changeCode: function(code) {
    tree.set('editorCode', code);
    tree.commit();
  },

  playBot: function(id) {
    var botCursor = tree.select('bots', {id: id});
    if (!botCursor.get()) {
      throw new Error('Bot does not exist in tree');
    }
    botCursor.set('playBot', true);
  },

  stopBot: function(id) {
    var botCursor = tree.select('bots', {id: id});
    if (!botCursor.get()) {
      throw new Error('Bot does not exist in tree');
    }
    botCursor.set('playBot', false);
  },

  receiveBot: function(bot) {
    // TODO(ibash) validate bot...
    tree.select('bots').push(bot);
  },

  saveAndPlayBot: function(id, router) {
    // If the editor code changed, then we save that (and get a new id) and then
    // play that bot.
    // If the code has not changed we just play the bot directly.
    var editorCode = tree.get('editorCode');

    if (editorCode === null) {
      module.exports.playBot(id);
    } else {
      api.saveBot(editorCode)
        .done(function(data) {
          // returns the fully saved bot
          // TODO(ibash) this is a bit awkward, having to do all this just to
          // get the bot to play...
          // the
          module.exports.receiveBot(data);
          tree.commit();
          module.exports.playBot(data.id);
          router.transitionTo('/bots/' + data.id);
        })
        .fail(function() {
          // TODO(ibash) fail handling...
          debugger;
        });
    }
  }
};
