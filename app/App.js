var React = require('react');

var AppStore = require('./stores/AppStore');
var AppActionCreators = require('./actions/AppActionCreators');
var Editor = require('./components/Editor');
var Header = require('./components/Header');
var Viewer = require('./components/Viewer');

module.exports = React.createClass({
  displayName: 'App',

  componentDidMount: function() {
    AppStore.addChangeListener(this.onAppStoreChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onAppStoreChange);
  },

  getInitialState: function() {
    return AppStore.getState();
  },

  onAppStoreChange: function() {
    this.setState(AppStore.getState());
  },

  onCodeChange: function(event) {
    AppActionCreators.changeCode(event.target.value);
  },

  onClickPlay: function() {
    AppActionCreators.saveAndPlayBot();
  },

  onClickStop: function() {
    AppActionCreators.stopBot();
  },

  render: function() {
    var headerProps = {
      onClickPlay: this.onClickPlay,
      onClickStop: this.onClickStop,
    };

    var editorProps = {
      code: this.state.code,
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
