/**
 * AppActionCreators
 */
var $ = require('jquery');
var AppConstants = require('../constants/AppConstants');
var AppStore = require('../stores/AppStore');
var Dispatcher = require('../dispatcher/Dispatcher');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
  changeCode: function(code) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_CODE,
      code: code
    });
  },

  saveAndPlayBot: function(id) {
    var bot = AppStore.getBot(id);
    var editorCdoe = AppStore.getEditorCode();

    // If there is no bot or the editor code was changed and is different...
    if (!bot || (editorCdoe !== null && bot.code !== editorCdoe)) {
      $.ajax({
        data: {code: editorCdoe},
        method: 'POST',
        // TODO(ibash) get the url from somewhere else...
        url: 'http://localhost:5000/api/bots',
        // TODO(ibash) handle failure case as well
        success: function(data) {
          Dispatcher.dispatch({
            type: ActionTypes.SAVED,
            id: data.id
          });

          module.exports.playBot(data.id);
        }
      });
    } else {
      module.exports.playBot(id);
    }
  },

  playBot: function(id) {
    Dispatcher.dispatch({
      type: ActionTypes.PLAY_BOT,
      id: id
    });
  },

  stopBot: function(id) {
    Dispatcher.dispatch({
      type: ActionTypes.STOP_BOT,
      id: id
    });
  },

  loadBot: function(id) {
    $.ajax({
      method: 'GET',
      // TODO(ibash) make relative url after proxy works...
      url: 'http://localhost:5000/api/bots/' + id,
      // TODO(ibash) handle failure case as well
      success: function(data) {
        Dispatcher.dispatch({
          type: ActionTypes.BOT_LOADED,
          bot: data
        });
      }
    });
  }
};
