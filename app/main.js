require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('./assets/style.scss');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var tree = require('./tree');

Router.run(routes, Router.HistoryLocation, function(Root) {
  React.render(<Root tree={tree}/>, document.body);
});
