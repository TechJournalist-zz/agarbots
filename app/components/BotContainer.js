/**
 * BotContainer
 */
var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActionCreators = require('../actions/AppActionCreators');
var Editor = require('../components/Editor');
var Header = require('../components/Header');
var Viewer = require('../components/Viewer');

module.exports = React.createClass({
  displayName: 'BotContainer',

  // TODO(ibash) propTypes

  componentDidMount: function() {
    AppStore.addChangeListener(this.onAppStoreChange);
    console.log('bots container mounted, requesting data', this.props);
    this.requestData();
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onAppStoreChange);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('will receive props called!', this.props, nextProps);
    if (this.props.params.id !== nextProps.params.id) {
      this.requestData();
    }
  },

  getInitialState: function() {
    // TODO(ibash) make this and onAppStoreChange DRY
    return {
      bot: AppStore.getBot(this.props.params.id),
      editorCode: AppStore.getEditorCode()
    };
  },

  onAppStoreChange: function() {
    // TODO(ibash) make this and getInitialState DRY
    this.setState({
      bot: AppStore.getBot(this.props.params.id),
      editorCode: AppStore.getEditorCode()
    });
  },

  requestData: function() {
    // TODO(ibash) handle new bot?
    AppActionCreators.loadBot(this.props.params.id);
  },

  onCodeChange: function(event) {
    AppActionCreators.changeCode(event.target.value);
  },

  onClickPlay: function() {
    AppActionCreators.saveAndPlayBot(this.props.params.id);
  },

  onClickStop: function() {
    AppActionCreators.stopBot(this.props.params.id);
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
      id: this.state.id,
      playBot: this.state.playBot
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
