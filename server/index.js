var WebSocketServer = require('ws').Server;
var app = require('./app');
var handlers = require('./websocket_handlers');

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

var wss = new WebSocketServer({server: server, path: '/socket'});
wss.on('connection', handlers.onConnection);
