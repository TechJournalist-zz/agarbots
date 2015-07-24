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
    if (steps) {
      cursor.undo(steps);
    }

    logsManager = new LogsManager(cursor);
  });

  it('starts with empty logs', function() {
    assert.lengthOf(cursor.get('logs'), 0);
  });

  describe('#reset', function() {
    beforeEach(function() {
      sinon.spy(logsManager, 'destroyWebSocket');
      sinon.spy(logsManager, 'createWebSocket');

      cursor.set('logs', [1, 2, 3]);
      tree.commit();

      logsManager.reset();
      tree.commit();
    });

    it('destroys the previous web socket', function() {
      assert.isTrue(logsManager.destroyWebSocket.calledOnce);
    });

    it('creates a new web socket', function() {
      assert.isTrue(logsManager.createWebSocket.calledOnce);
    });

    it('clears logs', function() {
      assert.lengthOf(cursor.get('logs'), 0);
    });
  });

  describe('calling reset', function() {
    beforeEach(function() {
      sinon.spy(logsManager, 'reset');
      cursor.set('isPlaying', true);
      tree.commit();
    });

    it('is called if isPlaying changes from false to true', function() {
      assert.isTrue(logsManager.reset.calledOnce);
    });

    it('is not called a second time if isPlaying changes from true to true', function() {
      cursor.set('isPlaying', true);
      tree.commit();
      assert.isTrue(logsManager.reset.calledOnce);
    });
  });

  it('updates logs from connection');

  it('clears logs when playId changes');
});
