/**
 * tree
 */
var _ = require('lodash');
var Baobab = require('baobab');
module.exports = new Baobab({
  bots: [
    // The "new" / default bot.
    {
      id: 1,
      code: 'function step(state, controller) {\n}',
      playBot: false
    }
  ],
  currentBotId: 1,
  editorCode: null
}, {
  facets: {
    currentBot: {
      cursors: {
        id: ['currentBotId'],
        bots: ['bots'],
      },
      get: function(data) {
        return _.find(data.bots, {id: data.id});
      }
    }
  }
});
