require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('./assets/style.scss');

var React = require('react');
var App = require('./App.js');

React.render(<App/>, document.getElementById('body'))
