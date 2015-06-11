var React = require('react');

var Header = require('./components/Header');
var Editor = require('./components/Editor');
var Favicon = require('react-favicon');

var faviconUrl = require('./assets/favicon.ico');

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
