/**
 * api
 */
var $ = require('jquery');

module.exports = {
  loadBot: function(id) {
    return $.get('/api/bots/' + id);
  },

  saveBot: function(code) {
    return $.post('/api/bots', {code: code});
  },

  savePlay: function(code) {
    return $.post('/api/plays', {code: code});
  }
};
