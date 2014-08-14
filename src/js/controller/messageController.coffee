define (require, exprots, module) ->
  msgTpl =
    msgItem: """
      <li data-msgkey=""><span class="user-name">{{name}}：</span><article class="text-content">{{content}}</article></li>
    """
    sysTip: """
      <li data-msgkey=""><span class="user-name">系统提示：</span><article class="text-content">{{tip}}</article></li>
    """
  _createMsg = (msg) ->
    Mustache.render(msgTpl.msgItem, msg)

  _createSysTip = (msg) ->
    data =
      tip: msg
    Mustache.render(msgTpl.sysTip, data)

  class Message
    constructor: ->

    getMessage: (msg) ->
      console.log msg

    sendMessage: (msg) ->
      if socket.connected
        socket.emit "message", msg
      else


    validateMsg: (text) ->
      flag = if $.trim(text) is "" then false else true
      return flag
    appendMsg: (msg) ->
      _createMsg msg

    appendSysMsg: (msg) ->
      _createSysTip msg

  module.exports = Message
