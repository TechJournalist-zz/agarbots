require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('./assets/style.scss');

var React = require('react');
var Router = require('react-router');
var logsManager = require('./logs_manager');
var routes = require('./routes.jsx');
var tree = require('./tree');

Router.run(routes, Router.HistoryLocation, function(Root) {
  React.render(<Root tree={tree}/>, document.body);
});
