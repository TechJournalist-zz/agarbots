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
      tree.commit();
    }

    logsManager = new LogsManager(cursor);
    sinon.stub(logsManager, 'destroyWebSocket');
    sinon.stub(logsManager, 'createWebSocket');
  });

  it('starts with empty logs', function() {
    assert.lengthOf(cursor.get('logs'), 0);
  });

  describe('#reset', function() {
    beforeEach(function() {
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

  it('updates logs', function() {
    logsManager.onLog({id: 1, play_id: 1, message: 'hello'});
    logsManager.onLog({id: 2, play_id: 1, message: 'goodbye'});
    logsManager.onLog({id: 3, play_id: 1, message: '...'});
    tree.commit();

    assert.deepEqual(cursor.get('logs'), [
      {id: 1, play_id: 1, message: 'hello'},
      {id: 2, play_id: 1, message: 'goodbye'},
      {id: 3, play_id: 1, message: '...'},
    ]);
  });
});
