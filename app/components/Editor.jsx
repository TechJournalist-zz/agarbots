require('codemirror/lib/codemirror.css');
require('codemirror/theme/solarized.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/edit/matchbrackets');

var React = require('react');
var CodeMirror = require('react-code-mirror');

module.exports = React.createClass({
  displayName: 'Editor',

  propTypes: {
    code: React.PropTypes.string,
    onCodeChange: React.PropTypes.func.isRequired,
  },

  componentDidMount: function() {
    // TODO(ibash) Hack fix. Something is weird with rendering code mirror, we
    // have to force a refresh after some time.
    var self = this;
    setTimeout(function() {
      var editor = self.refs.codeMirror.editor;
      if (editor) {
        editor.refresh();
      } else {
        throw new Error('Could not refresh code mirror');
      }
    }, 500);
  },

  render: function () {
    var codeMirrorProps = {
      ref: 'codeMirror',
      style: {border: '1px solid black'},
      textAreaClassName: ['form-control'],
      textAreaStyle: {minHeight: '10em'},
      value: this.props.code,
      mode: 'javascript',
      theme: 'solarized',
      lineNumbers: true,
      matchBrackets: true,
      onChange: this.props.onCodeChange
    };

    return (<CodeMirror {...codeMirrorProps}/>);
  }
});
