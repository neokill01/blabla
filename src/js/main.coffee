define (require, exports, module) ->
  Message = require "messageController"
  Account = require "accountController"
  User = require "userController"
  config = {}
  blablaTpl =
    header: """
      <header class="header">
			  <h1>{{name}}</h1>
		  </header>
    """
    footer: """
      <footer class="footer">
			  <h3>Author:{{author}}</h3>
		  </footer>
    """
    main: """
      <section class="main">
        <section class="user-wrap"></section>
        <section class="chat-main">
          <div class="chats-wrap">
            <ul class="chats">
            </ul>
          </div>
          <div class="send-wrap">
            <textarea class="send-content" contenteditable="true" placeholder="说点什么……" autofocus="autofocus"></textarea>
            <button class="btn-send" type="button">发送</button>
          </div>
        </section>
      </section>
    """

  _createChatTpl = ($container, data) ->
    headerTpl = Mustache.render(blablaTpl.header, data)
    footerTpl = Mustache.render(blablaTpl.footer, data)
    mainTpl = blablaTpl.main
    $container.html "#{headerTpl}#{mainTpl}#{footerTpl}"
    $("body").append '<div class="bla-modal-fadein"></div>'

  # 展示新接收到的消息
  _showMsg = ($container, msg) ->
    $scrollWrap = $container.find(".chats-wrap")
    $msgList = $container.find(".chats")
    $msgList.append msg
    _scrollBarPos($scrollWrap, $msgList)

  # 展示自己发出的消息
  _showSelfMsg = ($container ,msg) ->
    $scrollWrap = $container.find(".chats-wrap")
    $msgList = $container.find(".chats")
    $textarea = $container.find(".send-content")
    $msgList.append msg
    _scrollBarPos($scrollWrap, $msgList)
    _clearTextarea $textarea

  # 清空输入框内容
  _clearTextarea = ($textarea) ->
    $textarea.val("")

  # 展示好友数据
  _showUserList = ($container, data) ->
    $container.find(".user-wrap").html data

  _handleServerMessage = ->
    socket.on "connect", ->
      console.log socket.connected
      account = new Account
      account.register()

    socket.on "message", (data) ->
      _getData(data)

    socket.on "repeat", ->
      account = new Account
      account.reregister()

    socket.on "systemMsg", (data) ->
      _getSysData(data)

    socket.on "list", (data) ->
      listHtml = new User().appendList data
      _showUserList(config.container, listHtml)

  _getSysData = (data) ->
    tipHtml =  new Message().appendSysMsg(data);
    _showMsg(config.container, tipHtml)

  _getData = (data) ->
    msgHtml =  new Message().appendMsg(data);
    _showMsg(config.container, msgHtml)
  # 滚动条位置控制
  _scrollBarPos = ($obj, $child) ->
    tempTop = $child.outerHeight();
    top = $obj.outerHeight()
    scrollTop = if top > tempTop then top else tempTop
    $obj.scrollTop scrollTop

  init = ($container, info) ->
    config.container = $container
    _createChatTpl($container, info)
    _handleServerMessage()
    # 事件处理绑定
    bind $container

  events =
    _sendEvent: (e) ->
      message = new Message
      $this = $(this)
      msg =
        name: "我"
        content: $this.siblings(".send-content").val()
      if message.validateMsg(msg.content)
        events._send msg
      else
        $this.siblings(".send-content").val("")
      $this.siblings(".send-content").focus()
      return false

    _sendKeyEvent: (e) ->
      message = new Message
      if e.which is 13
        $this = $(this)
        msg =
          name: "我"
          content: $this.val()
        if message.validateMsg(msg.content)
          events._send msg
        else
          $this.val("")
        $this.focus()
        return false
      else
        return

    _send: (msg) ->
      message = new Message
      message.sendMessage msg
      msgHtml = message.appendMsg msg
      _showSelfMsg config.container, msgHtml

    sendListener: ($container) ->
      $container.on "click", ".btn-send", events._sendEvent
      $container.on "keyup", ".send-content", events._sendKeyEvent

  bind = ($container) ->
    events.sendListener $container

  module.exports =
    init: init
    send: events._send
