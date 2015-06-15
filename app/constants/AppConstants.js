/**
 * AppConstants
 */
var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    BOT_LOADED: null,
    PLAY_BOT: null,
    SAVED: null,
    STOP_BOT: null
  })
};
