var LogsManager = require('../app/LogsManager.js');
var tree = require('../app/tree.js');

describe('LogsManager', function() {
  var cursor;
  var logsManager;

  before(function() {
    cursor = tree.select();
    cursor.startRecording(Number.MAX_SAFE_INTEGER);
  });

  beforeEach(function() {
    var steps = cursor.getHistory().length;
    console.log('steps');
    console.log(steps);
    if (steps !== 0) {
      cursor.undo(steps);
    }

    logsManager = new LogsManager(cursor);
  });

  it('starts with empty logs', function() {
    assert.lengthOf(cursor.get('logs'), 0);
  });

  it('creates a websocket connection when playing', function() {
    sinon.spy(logsManager, 'createWebSocket');
    cursor.set('isPlaying', true);
    assert.isTrue(logsManager.createWebSocket.calledOnce);
  });

  it('updates logs from connection');

  it('clears logs when playId changes');
});
