/**
 * BotContainer
 */
var React = require('react');
var Navigation = require('react-router').Navigation;
var branch = require('baobab-react/mixins').branch;
var Editor = require('../components/Editor');
var Viewer = require('../components/Viewer');
var actions = require('../actions');

module.exports = React.createClass({
  displayName: 'BotContainer',

  mixins: [branch, Navigation],

  propTypes: {
    params: React.PropTypes.shape({
      id: React.PropTypes.number
    })
  },

  cursors: {
    editorCode: ['editorCode']
  },

  facets: {
    bot: 'currentBot'
  },

  // TODO(ibash) propTypes

  componentDidMount: function() {
    // TODO(ibash) see id you can get id as an int
    // TODO(ibash) handle bot not existing
    actions.setCurrentBot(parseInt(this.props.params.id, 10));
  },

  componentWillUnmount: function() {
  },

  componentWillReceiveProps: function(nextProps) {
    // TODO(ibash) see id you can get id as an int
    // TODO(ibash) handle bot not existing
    actions.setCurrentBot(parseInt(nextProps.params.id, 10));
  },

  onCodeChange: function(event) {
    actions.changeCode(event.target.value);
  },

  render: function() {
    var code;
    if (this.state.editorCode === null) {
      code = this.state.bot.code;
    } else {
      code = this.state.editorCode;
    }

    var editorProps = {
      code: code,
      onCodeChange: this.onCodeChange
    };

    var viewerProps = {
      ref: 'viewer',
      id: this.state.bot.id,
      playBot: this.state.bot.playBot
    };

    return (
      <div>
        <Editor {...editorProps}/>
        <Viewer {...viewerProps}/>
      </div>
    );
  }
});
