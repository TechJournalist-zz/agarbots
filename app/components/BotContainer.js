/**
 * BotContainer
 */
var React = require('react');
var branch = require('baobab-react/mixins').branch;
var Editor = require('../components/Editor');
var Header = require('../components/Header');
var Viewer = require('../components/Viewer');
var actions = require('../actions');

module.exports = React.createClass({
  displayName: 'BotContainer',

  mixins: [branch],

  cursors: {
    editorCode: ['editorCode']
  },

  facets: {
    bot: 'currentBot'
  },

  // TODO(ibash) propTypes

  componentDidMount: function() {
    actions.setCurrentBot(this.props.params.id);
  },

  componentWillUnmount: function() {
  },

  componentWillReceiveProps: function(nextProps) {
    actions.setCurrentBot(nextProps.params.id);
  },

  onCodeChange: function(event) {
    actions.changeCode(event.target.value);
  },

  onClickPlay: function() {
    actions.saveAndPlayBot(this.props.params.id);
  },

  onClickStop: function() {
    actions.stopBot(this.props.params.id);
  },

  render: function() {
    var headerProps = {
      showBotActions: true,
      onClickPlay: this.onClickPlay,
      onClickStop: this.onClickStop,
    };

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
        <Header {...headerProps}/>
        <Editor {...editorProps}/>
        <Viewer {...viewerProps}/>
      </div>
    );
  }
});
