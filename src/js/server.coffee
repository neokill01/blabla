# 创建一个socket服务,监听4000端口
express = require "express"
app = express()
app.use(express.static(__dirname))
app.get("/", (req, res)->
  res.send("<h1>Hello Express</h1>")
)
server = app.listen 5555, "127.0.0.1"

io = require("socket.io").listen 4000
open = require("open")
ProtoBuf = require("protobufjs")

blabla = io.of "/blabla"
users = []
# 添加用户
addUser = (user, callback) ->
  users.push user
  callback()
#删除用户
delUser = (nickname, callback) ->
  console.log users
  console.log nickname
  if users.length
    return users.splice i, 1 for user, i in users when user.nickname is nickname

# 检查昵称是否重复
checkNickname = (data) ->
  isIn = false
  if users.length
    for k in users
      if k.nickname is data.nickname
        isIn = true
        return isIn
  return isIn

# 建立socket服务器连接
blabla.on "connection", (socket) ->
  #监听注册事件
  socket.on "register", (data)->
    if checkNickname(data)
      socket.emit "repeat", systip: "昵称有重复"
    else
      socket.nickname = data.nickname
      addUser(data, ->
        socket.emit "systemMsg", "你已进入聊天室，你的昵称是#{data.nickname}"
        socket.broadcast.emit "systemMsg", "#{data.nickname}进入聊天室"
        #发射用户list事件
        socket.emit "list", users
        socket.broadcast.emit "list", users
      )

  # 监听客户端消息事件
  socket.on "message", (data) ->
    if socket.nickname
      data.name = socket.nickname
    # 增加一个服务器端事件
#    socket.emit "message", data
    socket.broadcast.emit "message", data

  # 监听socket离线事件
  socket.on "disconnect", ->
    if socket.nickname
      socket.broadcast.emit "systemMsg", "#{socket.nickname}离开聊天室"
      delUser(socket.nickname, ->)
      #发射用户list事件
      socket.emit "list", users
      socket.broadcast.emit "list", users
