WebSocket = require "ws"
ws = new WebSocket( "ws://127.0.0.1:4000/blabla",
  protocolVersion: 8
  orign: "127.0.0.1"
)
ws.on "open", ->
  console.log('connected');
  ws.send(Date.now().toString(), {mask: true})

ws.on "close", ->
  console.log('disconnected');

ws.on "message", (data, flags) ->
  console.log("Roundtrip time: #{Date.now() - parseInt(data)}ms", flags)
  setTimeout(
    ->
      ws.send(Date.now().toString(), {mask: true})
    500)