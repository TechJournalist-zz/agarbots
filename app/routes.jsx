/**
 * routes
 */
var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var App = require('./App.jsx');
var BotContainer = require('./components/BotContainer.jsx');
var Docs = require('./components/Docs.jsx');

var RedirectToDefaultValue = React.createClass({
  statics: {
    willTransitionTo: function(transition, params) {
      transition.redirect('/bots/1');
    }
  },
  render: function() { return null; }
});

module.exports = (
  <Route path='' handler={App}>
    <DefaultRoute handler={RedirectToDefaultValue}/>
    <Route name='bot' path='/bots/:id?' handler={BotContainer}/>
    <Route name='docs' path='/docs' handler={Docs}/>
  </Route>
);
