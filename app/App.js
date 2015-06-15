/**
 * App
 */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

module.exports = React.createClass({
  displayName: 'App',

  render: function() {
    return (
      <RouteHandler/>
    );
  }
});
