var React = require('react');

var Header = require('./Components/Header');
var Editor = require('./Components/Editor');
var Favicon = require('react-favicon');

var faviconUrl = require('./Assets/favicon.ico');

module.exports = React.createClass({
  displayName: 'App',

  render: function () {

    return (<div>
              <Header/>
              <Editor/>
              <Favicon url={ faviconUrl }/>
            </div>
           );
  }

});
