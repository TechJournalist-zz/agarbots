/**
 * AppStore
 */
var _ = require('lodash');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';


var bots = {
  new: {
    id: 0,
    code: 'function step(state, controller) {\n}',
    isCodeChanged: false,
    playBot: false
  }
};

var editorCode = null;

var AppStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * addChangeListener
   *
   * @param {function} callback
   * @return {undefined}
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * removeChangeListener
   *
   * @param {function} callback
   * @return {undefined}
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * getEditorCode
   *
   * @return {string | null}
   */
  getEditorCode: function() {
    return editorCode;
  },

  /**
   * getBot
   *
   * @param id
   * @return {undefined}
   */
  getBot: function(id) {
    return bots[id] || null
  }
});

AppStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.BOT_LOADED:
      bots[action.bot.id] = action.bot;
      AppStore.emitChange();
      break;

    case ActionTypes.CHANGE_CODE:
      editorCode = action.code;
      AppStore.emitChange();
      break;

    case ActionTypes.PLAY_BOT:
      bots[action.id].playBot = true;
      AppStore.emitChange();
      break;

    case ActionTypes.SAVED:
      state.id = action.id;
      state.isCodeChanged = false;
      AppStore.emitChange();
      break;

    case ActionTypes.STOP_BOT:
      state.playBot = false;
      AppStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = AppStore;
