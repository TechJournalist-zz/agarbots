require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('./assets/style.scss');

var React = require('react');
var App = require('./App');
var AllTheMagic = require('./AllTheMagic');

var magic = new AllTheMagic();

function render() {
  React.render(<App {...magic.getState()}/>, document.getElementById('body'))
}

magic.onChange = render;
render();
