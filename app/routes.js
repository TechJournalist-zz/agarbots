/**
 * routes
 */
var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var App = require('./App');
var BotContainer = require('./components/BotContainer');

var RedirectToDefaultValue = React.createClass({
  statics: {
    willTransitionTo: function(transition, params) {
      transition.redirect('/bots/new');
    }
  },
  render: function() { return null; }
});

module.exports = (
  <Route path='' handler={App}>
    <DefaultRoute handler={RedirectToDefaultValue}/>
    <Route path='/bots/:id?' handler={BotContainer}/>
  </Route>
);
