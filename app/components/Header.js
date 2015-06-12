var React = require('react');
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {
    onClickRun: React.PropTypes.func.isRequired,
    onClickStop: React.PropTypes.func.isRequired
  },
 
  render: function() {
    return (
      <div className='header'>
        <Button onClick={this.props.onClickRun}>
          <i className='fa fa-play'></i>&nbsp;Run
        </Button>
        <Button>
          <i className='fa fa-stop'></i>&nbsp;Stop
        </Button>
      </div>
		);
	}
});
