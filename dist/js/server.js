(function() {
  var addUser, app, blabla, checkNickname, delUser, express, io, server, users;

  express = require("express");

  app = express();

  app.use(express["static"](__dirname));

  app.get("/", function(req, res) {
    return res.send("Hello");
  });

  server = app.listen(5555, "127.0.0.1");

  io = require("socket.io").listen(4000);

  blabla = io.of("/blabla");

  users = [];

  addUser = function(user, callback) {
    users.push(user);
    return callback();
  };

  delUser = function(nickname, callback) {
    var i, user, _i, _len;
    console.log(users);
    console.log(nickname);
    if (users.length) {
      for (i = _i = 0, _len = users.length; _i < _len; i = ++_i) {
        user = users[i];
        if (user.nickname === nickname) {
          return users.splice(i, 1);
        }
      }
    }
  };

  checkNickname = function(data) {
    var isIn, k, _i, _len;
    isIn = false;
    if (users.length) {
      for (_i = 0, _len = users.length; _i < _len; _i++) {
        k = users[_i];
        if (k.nickname === data.nickname) {
          isIn = true;
          return isIn;
        }
      }
    }
    return isIn;
  };

  blabla.on("connection", function(socket) {
    socket.on("register", function(data) {
      if (checkNickname(data)) {
        return socket.emit("repeat", {
          systip: "昵称有重复"
        });
      } else {
        socket.nickname = data.nickname;
        return addUser(data, function() {
          socket.emit("systemMsg", "你已进入聊天室，你的昵称是" + data.nickname);
          socket.broadcast.emit("systemMsg", "" + data.nickname + "进入聊天室");
          socket.emit("list", users);
          return socket.broadcast.emit("list", users);
        });
      }
    });
    socket.on("message", function(data) {
      if (socket.nickname) {
        data.name = socket.nickname;
      }
      return socket.broadcast.emit("message", data);
    });
    return socket.on("disconnect", function() {
      if (socket.nickname) {
        socket.broadcast.emit("systemMsg", "" + socket.nickname + "离开聊天室");
        delUser(socket.nickname, function() {});
        socket.emit("list", users);
        return socket.broadcast.emit("list", users);
      }
    });
  });

}).call(this);
