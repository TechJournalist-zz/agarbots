var React = require('react');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {
    showBotActions: React.PropTypes.bool,
    onClickPlay: React.PropTypes.func.isRequired,
    onClickStop: React.PropTypes.func.isRequired
  },
 
  render: function() {
    if (this.props.showBotActions) {
      var playButton = (
        <Button onClick={this.props.onClickPlay}>
          <i className='fa fa-play'></i>&nbsp;Play
        </Button>
      );
      var stopButton = (
        <Button onClick={this.props.onClickStop}>
          <i className='fa fa-stop'></i>&nbsp;Stop
        </Button>
      );
    } else {
      var botsLink = <Link to='/'>Bots</Link>
    }

    return (
      <div className='header'>
        {playButton}
        {stopButton}
        {botsLink}
        <Link to='docs'>Documentation</Link>
      </div>
		);
	}
});
