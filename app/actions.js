/**
 * actions
 */
var api = require('./api');
var tree = require('./tree');

var actions =
module.exports = {
  loadBot: function(id) {
    return api
      .loadBot(id)
      .done(function(bot) {
        actions.receiveBot(bot);
      })
      .fail(function() {
        // TODO(ibash) fail handling...
        debugger;
      });
  },

  saveBot: function(router) {
    var editorCode = tree.get('editorCode');

    return api
      .saveBot(editorCode)
      .done(function(data) {
        actions.receiveBot(data);
        router.transitionTo('/bots/' + data.id);
      })
      .fail(function() {
        // TODO(ibash) fail handling...
        debugger;
      });
  },

  receiveBot: function(bot) {
    // TODO(ibash) validate bot...
    var existing = tree.select('bots', {id: bot.id});
    existing.unset();
    tree.select('bots').push(bot);
  },

  loadAndSetCurrentBotId(id) {
    return actions
      .loadBot(id)
      .done(function(bot) {
        actions.setCurrentBotId(bot.id);
        actions.setEditorCode(bot.code);
      });
  },

  setCurrentBotId: function(id) {
    tree.set('currentBotId', id);
  },

  setEditorCode: function(code) {
    tree.set('editorCode', code);
    tree.commit();
  },

  play: function() {
    var editorCode = tree.get('editorCode');

    return api
      .savePlay(editorCode)
      .done(function(data) {
        tree.set('playId', data.id);
        tree.set('isPlaying', true);
      })
      .fail(function() {
        // TODO(ibash) fail handling...
        debugger;
      });
  },

  stop: function() {
    tree.set('isPlaying', false);
  }
};
