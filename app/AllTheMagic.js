/**
 * AllTheMagic
 *
 * Handles all communication with backend. Loading things, and giving state back
 * to react view components.
 *
 * This is a standin until introducing something like backbone models, flux, etc
 */

var _ = require('lodash');
var $ = require('jquery');
function AllTheMagic() {
  _.bindAll(this);
  this.code = '';
}
module.exports = AllTheMagic;

AllTheMagic.prototype.getState = function getState() {
  var state = {};

  state.header = {};
  state.header.onClickRun = this.onClickRun;
  state.header.onClickStop = this.onClickStop;

  state.editor = {};
  state.editor.code = this.code;
  state.editor.onCodeChange = this.onCodeChange;

  return state;
};

AllTheMagic.prototype.triggerChange = function triggerChange() {
  if (this.onChange) {
    this.onChange();
  }
};

/**
 * onClickRun
 *
 * Runs the bot code and displays it in the viewer.
 *
 * @return {undefined}
 */
AllTheMagic.prototype.onClickRun = function onClickRun(event) {
  $.ajax({
    data: {code: this.code},
    method: 'POST',
    url: 'http://localhost:5000/bots',
    success: function(data) {
      debugger;
    }
  });
}

AllTheMagic.prototype.onClickStop = function onClickStop(event) {
  // TODO(ibash) errr... what to do here?
}

AllTheMagic.prototype.onCodeChange = function onCodeChange(event) {
  this.code = event.target.value;
  this.triggerChange();
};
