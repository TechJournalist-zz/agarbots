/**
 * App
 */
var _ = require('lodash');
var React = require('react');
var ReactRouter = require('react-router');
var RouteHandler = require('react-router').RouteHandler;
var root = require('baobab-react/mixins').root;
var Header = require('./components/Header.jsx');
var actions = require('./actions');

module.exports = React.createClass({
  displayName: 'App',

  mixins: [ReactRouter.State, root],

  onClickPlay: function() {
    actions.play();
  },

  onClickStop: function() {
    actions.stop();
  },

  onClickSave: function() {
    actions.saveBot(this.context.router);
  },

  render: function() {
    var headerProps = {
      onClickPlay: this.onClickPlay,
      onClickStop: this.onClickStop,
      onClickSave: this.onClickSave
    };

    return (
      <div>
        <Header {...headerProps}/>
        <RouteHandler/>
      </div>
    );
  }
});
