## AgarBots Documentation

##### Table of Contents
[FAQ](#faq)
[API Spec](#api)
- [State](#state)
- [Controller](#controller)
[Examples](#examples)

<a name="faq"/>
### FAQ

**Q:** What is AgarBots?

  AgarBots is an easy way to create bots that play [agar.io](https://agar.io), a
  multiplayer browser game.

**Q:** How do I use AgarBots?

  Simply write the code for a bot into the editor, and then click play!

**Q:** Do you have some sample code?

  Yes. Here's a bot that runs to the center of the board. To try it out
  copy/paste it into the [AgarBots](http://agarbots.com) editor and click play.

```javascript
function step(state, controller) {
  var centerX;
  var centerY;

  centerX = (state.boardSize.maxX - state.boardSize.minX) / 2;
  centerX = centerX + state.boardSize.minX;

  centerY = (state.boardSize.maxY - state.boardSize.minY) / 2;
  centerY = centerY + state.boardSize.minY;

  controller.move(centerX, centerY);
}
```

**Q:** How does the `step` function work?

  Within AgarBots, the `step` function is called multiple times a second.

  Each time `step` is called, the `state` parameter has the latest information
  about the game board, that is where your blob and other blobs are located.
  See [state](#state) for details on what information it has. The `controller`
  parameter gives you a way to control your blobs, you can move them, and split.
  See [controller](#controller) for details on what actions you can take.

**Q:** How does the coordinate system work?

  The coordinate system has `(x, y)` coordinates. The top left corner
  corresponds to the point with the smallest X and smallest Y (TODO(ibash)
  verify this is true). That is the `X` coordinate increases as you move right
  and the `Y` coordinate increases as you move down.

  Within the `state` parameter to `step`, there is `state.boardSize`.
  `state.boardSize` has four attributes, `minX`, `maxX`, `minY`, and `maxY`.
  These represent the minimum and maximum positions you can move to.

<a name="api"/>
### API Spec

There are two objects to be concerned about in the API. `state` and the
`controller`. `state` holds the current world state and `controller` lets you
move and control your blob.

<a name="state"/>
#### State

  State is an object that looks like:

```javascript
{
  blobs: [
    // TODO
  ],
  boardSize: {
    minX: <number>,
    maxX: <number>,
    minY: <number>,
    maxY: <number>
  },
  ownedBlobIds: [
    // TODO
  ]
}
```

  TODO spec out state
  TODO example of how you would use state in code

<a name="controller"/>
#### Controller

  Controller is an object that has the following methods defined:

  * `move` with signature `function(x, y)`

    `move` moves towards absolute coordinates. It sets the target that the
    player will continually move to. That is, if you call `controller.move(0, 0)`
    the bot will continually move to the coordinates `(0, 0)` on the board.

<a name="examples"/>
### Examples

Below are a few code examples of bots you can make. Copy/paste them into
[AgarBots](http://agarbots.com) and give them a spin!

#### Eat bot

TODO show eat bot example

#### Run away bot

TODO show eat bot example
