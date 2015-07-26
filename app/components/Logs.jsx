/**
 * Logs
 */
var React = require('react');

module.exports = React.createClass({
  displayName: 'Logs',

  propTypes: {
    messages: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  render: function() {
    var messages = _.map(this.props.messages, function(message) {
      return (<p>{message}</p>);
    });

    return (
      <div>
        {messages}
      </div>
    );
  }
});
