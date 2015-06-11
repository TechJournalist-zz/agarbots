var React = require('react');
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
      <div className='header'>
        <Button><i className='fa fa-bed'></i>Run</Button>
        <Button>|| Stop</Button>
      </div>
		)
	}

});


