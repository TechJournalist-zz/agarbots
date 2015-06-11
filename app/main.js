require('./Assets/style.scss');
require('./Assets/bootstrap.css');
require('font-awesome/css/font-awesome.css');

var React = require('react');
var App = require('./App.js');

React.render(<App/>, document.getElementById('body'))
