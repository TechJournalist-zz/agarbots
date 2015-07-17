/**
 * Viewer
 *
 * Plays a session of agar.io
 */
var $ = require('jquery');
var React = require('react');
var Agar = require('../lib/Agar');

module.exports = React.createClass({
  displayName: 'Viewer',

  propTypes: {
    playId: React.PropTypes.number,
    isPlaying: React.PropTypes.bool.isRequired
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.playId !== nextProps.playId ||
      this.props.isPlaying !== nextProps.isPlaying;
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
    if (this.props.isPlaying) {
      var address = 'ws://' + window.location.host + '/socket?playId=' + this.props.playId;
      this.agar = new Agar(address, this.refs.canvas.getDOMNode());
      this.agar.start();
    } else if (this.agar) {
      this.agar.stop();
    }
  },

  render: function() {
    return (
      <div>
        <canvas ref='canvas' width='800' height='600'></canvas>
      </div>
    );
  }
});
