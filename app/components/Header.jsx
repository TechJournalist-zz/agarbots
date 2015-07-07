var React = require('react');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {
    onClickPlay: React.PropTypes.func.isRequired,
    onClickStop: React.PropTypes.func.isRequired,
    onClickSave: React.PropTypes.func.isRequired,
  },
 
  render: function() {
    return (
      <div className='header'>
        <Button onClick={this.props.onClickPlay}>
          <i className='fa fa-play'></i>&nbsp;Play
        </Button>
        <Button onClick={this.props.onClickStop}>
          <i className='fa fa-stop'></i>&nbsp;Stop
        </Button>
        <Button onClick={this.props.onClickSave}>
          <i className='fa fa-save'></i>&nbsp;Save
        </Button>
        <a href='https://github.com/ibash/agarbots/blob/master/DOCUMENTATION.md' target='_blank'>Documentation</a>
      </div>
		);
	}
});
