WebSocket = require("ws").Server
ws = new WebSocket
  port: 4000

#广播消息的方法
ws.broadcast = (data) ->
  for client in this.clients
    client.send data
#监听连接
ws.on "connection", (client) ->
  #监听消息事件
  client.on 'message', (message) ->
    console.log 'received: %s', message
    ws.broadcast "广播消息：#{message}"

  client.send "欢迎使用websocket"

  #监听连接关闭事件
  client.on "close", ->
    console.log "一个客户端断开连接"
    ws.broadcast "客户端断开连接"


