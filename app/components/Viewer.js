/**
 * Viewer
 *
 * Plays a session of agar.io
 */
var $ = require('jquery');
var React = require('react');
var Agar = require('../lib/agar_io_main_out');

module.exports = React.createClass({
  displayName: 'Viewer',

  componentDidMount: function() {
    //var address = 'ws://' + window.location.host + '/socket';
    var address = 'ws://localhost:5000/socket?taco';
    Agar(window, $, address, this.refs.canvas.getDOMNode());
  },

  render: function() {
    return (
      <div>
        <canvas ref="canvas" width="800" height="600"></canvas>
      </div>
    );
  }
});
