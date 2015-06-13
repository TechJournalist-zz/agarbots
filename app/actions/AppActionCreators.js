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

  saveAndPlayBot: function() {
    if (AppStore.isCodeChanged()) {
      $.ajax({
        data: {code: AppStore.getCode()},
        method: 'POST',
        // TODO(ibash) get the url from somewhere else...
        url: 'http://localhost:5000/bots',
        // TODO(ibash) handle failure case as well
        success: function(data) {
          Dispatcher.dispatch({
            type: ActionTypes.SAVED,
            id: data.id
          });

          Dispatcher.dispatch({type: ActionTypes.PLAY_BOT});
        }
      });
    } else {
      Dispatcher.dispatch({type: ActionTypes.PLAY_BOT});
    }
  }
};
