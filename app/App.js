var React = require('react');

var Header = require('./components/Header');
var Editor = require('./components/Editor');
var Viewer = require('./components/Viewer');

module.exports = React.createClass({
  displayName: 'App',

  propTypes: {
    header: React.PropTypes.shape(Header.propTypes),
    editor: React.PropTypes.shape(Editor.propTypes)
  },

  render: function () {

    return (
      <div>
        <Header {...this.props.header}/>
        <Editor {...this.props.editor}/>
        <Viewer/>
      </div>
    );
  }
});
