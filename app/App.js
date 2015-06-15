/**
 * App
 */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var root = require('baobab-react/mixins').root;

module.exports = React.createClass({
  displayName: 'App',

  mixins: [root],

  render: function() {
    return (
      <RouteHandler/>
    );
  }
});
