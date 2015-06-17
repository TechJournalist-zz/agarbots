/**
 * api
 */
var $ = require('jquery');

module.exports = {
  saveBot: function(code) {
    return $.post('/api/bots', {code: code});
  }
};
