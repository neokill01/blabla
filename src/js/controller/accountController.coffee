define (require, exports, module) ->
  class Account
    constructor:() ->

    register: ->
      username = prompt("输入一个你喜欢的名字吧")
      while (!username)
        username = prompt("输入一个你喜欢的名字吧")
      socket.emit "register", {nickname: username}

    reregister: ->
      username = prompt("昵称有重复，请重新输入")
      while (!username)
        username = prompt("昵称有重复，请重新输入")
      socket.emit "register", {nickname: username}

    login: ->

  module.exports = Account