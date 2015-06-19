/**
 * App
 */
var _ = require('lodash');
var React = require('react');
var ReactRouter = require('react-router');
var RouteHandler = require('react-router').RouteHandler;
var root = require('baobab-react/mixins').root;
var Header = require('./components/Header');

module.exports = React.createClass({
  displayName: 'App',

  mixins: [ReactRouter.State, root],

  onClickPlay: function() {
    // TODO(ibash) see id you can get id as an int
    // TODO(ibash) there should be a better way to get access to the router...
    var id = parseInt(this.getParams().id, 10);
    actions.saveAndPlayBot(id, this.context.router);
  },

  onClickStop: function() {
    // TODO(ibash) see id you can get id as an int
    var id = parseInt(this.getParams().id, 10);
    actions.stopBot(id);
  },

  isBotsRoute: function() {
    var routes = this.getRoutes();
    return _.any(routes, function(route) {
      return route.name === 'bot';
    });
  },

  render: function() {
    var headerProps = {
      showBotActions: this.isBotsRoute(),
      onClickPlay: this.onClickPlay,
      onClickStop: this.onClickStop,
    };

    return (
      <div>
        <Header {...headerProps}/>
        <RouteHandler/>
      </div>
    );
  }
});
