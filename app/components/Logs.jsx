/**
 * Logs
 */
var React = require('react');

module.exports = React.createClass({
  displayName: 'Logs',

  propTypes: {
    logs: // Array of logs...
  },

  render: function() {
    var messages = _.map(this.props.logs, function(log) {
      return (<p>{log}</p>);
    });

    return (
      <div>
        {messages}
      </div>
    );
  }
});
