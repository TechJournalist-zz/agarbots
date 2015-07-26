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
      var address = this.socketAddress(this.props.playId);
      this.agar = new Agar(address, this.refs.canvas.getDOMNode());
      this.agar.start();
    } else if (this.agar) {
      this.agar.stop();
    }
  },

  // TODO(ibash) de-dupe with socket address stuff in logs manager, maybe make a
  // urls.js
  socketAddress: function(playId) {
    var protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    //var address = protocol + '//' + window.location.host + '/play?playId=' + playId;
    var address = protocol + '//localhost:5000/play?playId=' + playId;
    return address;
  },

  render: function() {
    return (
      <div>
        <canvas ref='canvas' width='800' height='600'></canvas>
      </div>
    );
  }
});
