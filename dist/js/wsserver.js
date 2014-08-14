(function() {
  var WebSocket, ws;

  WebSocket = require("ws");

  ws = new WebSocket("ws://127.0.0.1:4000/blabla", {
    protocolVersion: 8,
    orign: "127.0.0.1"
  });

  ws.on("open", function() {
    console.log('connected');
    return ws.send(Date.now().toString(), {
      mask: true
    });
  });

  ws.on("close", function() {
    return console.log('disconnected');
  });

  ws.on("message", function(data, flags) {
    console.log("Roundtrip time: " + (Date.now() - parseInt(data)) + "ms", flags);
    return setTimeout(function() {
      return ws.send(Date.now().toString(), {
        mask: true
      });
    }, 500);
  });

}).call(this);
