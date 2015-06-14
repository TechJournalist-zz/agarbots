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

  propTypes: {
    id: React.PropTypes.number,
    playBot: React.PropTypes.bool.isRequired
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.id !== nextProps.id ||
      this.props.playBot !== nextProps.playBot;
  },

  componentDidMount: function() {
    this.onDOMReady();
  },

  componentDidUpdate: function() {
    this.onDOMReady();
  },

  componentWillUnmount: function() {
    if (this.agar) {
      this.agar.stop();
      delete this.agar;
    }
  },

  onDOMReady: function() {
    if (this.props.playBot) {
      // TODO(ibash) move the hostname etc to something that's passed in
      var address = 'ws://localhost:5000/socket?id=' + this.props.id;
      this.agar = new Agar(address, this.refs.canvas.getDOMNode());
      this.agar.start();
    }
  },

  render: function() {
    return (
      <div>
        <canvas ref="canvas" width="800" height="600"></canvas>
      </div>
    );
  }
});
