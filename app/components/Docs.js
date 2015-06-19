/**
 * Docs
 */
var React = require('react');

module.exports = React.createClass({
  displayName: 'Docs',

  render: function() {
    return (
      <div>
        <h3>Documentation</h3>
        - What is AgarBots?
        AgarBots is an easy way to create bots that play <a href='https://agar.io'>agar.io</a>.
        - How do I use AgarBots?
        Simply write the code for a bot into the editor, and then click Play!
        - Can you show me a demo?
        Sure! Click Play below. We call this bot the "Run to Corner" bot - he simply runs to the top left corner of the screen.

          TODO(ibash) demo with move(0,0)

        - How does this work?
        The step function is called periodically... passed a state and controller. You use the state and controller to make decisions and tell the bot what to do.

        - How do I control the bot?

        Within the `step` function you write, the second argument is `controller`. The `controller` has methods to move, split, and shoot mass.

        - How does the coordinate system work?

        The coordinate system is (TODO look up name). That means that the top left corner is `(0,0)`. The `X` coordinate increases as you go right. The `Y` coordinate increase as you go down.

        - How do I know where food and other blobs are?
        - How do I know what is on the board?

        Within the `step` function you write, the first argument is `state`. The `state` has a list of all blobs on the board, the board size has methods to move, split, and shoot mass. It also has a list of blobs that you own. TODO(ibash) -- should add an attribute of do you own a blob or not, to each blob.

        - API

          - Controller

          - State

      </div>
    );
  }
});
