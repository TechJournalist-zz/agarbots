/**
 * AppStore
 */
var _ = require('lodash');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';


var state = {
  code: '',
  id: null,
  isCodeChanged: false,
  playBot: false
};

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
   * isCodeChanged
   *
   * @return {boolean}
   */
  isCodeChanged: function() {
    return state.isCodeChanged;
  },

  /**
   * getCode
   *
   * @return {string}
   */
  getCode: function() {
    return state.code;
  },

  /**
   * getState
   *
   * @return {Object}
   */
  getState: function() {
    return state;
  }
});

AppStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.CHANGE_CODE:
      state.code = action.code;
      state.isCodeChanged = true;
      AppStore.emitChange();
      break;

    case ActionTypes.PLAY_BOT:
      state.playBot = true;
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
