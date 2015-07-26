/**
 * BotContainer
 */
var _ = require('lodash');
var React = require('react');
var Navigation = require('react-router').Navigation;
var branch = require('baobab-react/mixins').branch;
var Editor = require('../components/Editor.jsx');
var Logs = require('../components/Logs.jsx');
var Viewer = require('../components/Viewer.jsx');
var LogsManager = require('../LogsManager');
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
    editorCode: ['editorCode'],
    isPlaying: ['isPlaying'],
    logs: ['logs'],
    playId: ['playId']
  },

  // TODO(ibash) propTypes

  componentDidMount: function() {
    this.load(this.props);
    new LogsManager(this.context.tree);
  },

  componentWillUnmount: function() {
  },

  componentWillReceiveProps: function(nextProps) {
    this.load(nextProps);
  },

  load: function(props) {
    // TODO(ibash) see id you can get id as an int
    var id = parseInt(props.params.id, 10);
    // TODO(ibash) handle bot not existing or loaded yet
    actions.loadAndSetCurrentBotId(id);
  },

  onCodeChange: function(event) {
    actions.setEditorCode(event.target.value);
  },

  render: function() {
    var editorProps = {
      code: this.state.editorCode,
      onCodeChange: this.onCodeChange
    };

    var logsProps = {
      messages: _.pluck(this.state.logs, 'message')
    };

    var viewerProps = {
      ref: 'viewer',
      playId: this.state.playId,
      isPlaying: this.state.isPlaying
    };

    return (
      <div>
        <Editor {...editorProps}/>
        <Logs {...logsProps}/>
        <Viewer {...viewerProps}/>
      </div>
    );
  }
});
