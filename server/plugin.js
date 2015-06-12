/**
 * plugin
 *
 * Plugin to run untrusted user code in a sandbox.
 *
 * User's code will look like:
 *
 *   function step(state, controller) {
 *     // do something with state and use controller
 *   }
 *
 * It will be appended to the end of this file and each step will communicate
 * the game state.
 */
application.setInterface({
  step: function(state) {
    // application.remote is the controller
    step(state, application.remote);
  }
});

// User code goes under here:
