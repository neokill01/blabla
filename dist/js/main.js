(function() {
  define(function(require, exports, module) {
    var Account, Message, User, bind, blablaTpl, config, events, init, _clearTextarea, _createChatTpl, _getData, _getSysData, _handleServerMessage, _scrollBarPos, _showMsg, _showSelfMsg, _showUserList;
    Message = require("messageController");
    Account = require("accountController");
    User = require("userController");
    config = {};
    blablaTpl = {
      header: "      <header class=\"header\">\n			  <h1>{{name}}</h1>\n</header>",
      footer: "      <footer class=\"footer\">\n			  <h3>Author:{{author}}</h3>\n</footer>",
      main: "<section class=\"main\">\n  <section class=\"user-wrap\"></section>\n  <section class=\"chat-main\">\n    <div class=\"chats-wrap\">\n      <ul class=\"chats\">\n      </ul>\n    </div>\n    <div class=\"send-wrap\">\n      <textarea class=\"send-content\" contenteditable=\"true\" placeholder=\"说点什么……\" autofocus=\"autofocus\"></textarea>\n      <button class=\"btn-send\" type=\"button\">发送</button>\n    </div>\n  </section>\n</section>"
    };
    _createChatTpl = function($container, data) {
      var footerTpl, headerTpl, mainTpl;
      headerTpl = Mustache.render(blablaTpl.header, data);
      footerTpl = Mustache.render(blablaTpl.footer, data);
      mainTpl = blablaTpl.main;
      $container.html("" + headerTpl + mainTpl + footerTpl);
      return $("body").append('<div class="bla-modal-fadein"></div>');
    };
    _showMsg = function($container, msg) {
      var $msgList, $scrollWrap;
      $scrollWrap = $container.find(".chats-wrap");
      $msgList = $container.find(".chats");
      $msgList.append(msg);
      return _scrollBarPos($scrollWrap, $msgList);
    };
    _showSelfMsg = function($container, msg) {
      var $msgList, $scrollWrap, $textarea;
      $scrollWrap = $container.find(".chats-wrap");
      $msgList = $container.find(".chats");
      $textarea = $container.find(".send-content");
      $msgList.append(msg);
      _scrollBarPos($scrollWrap, $msgList);
      return _clearTextarea($textarea);
    };
    _clearTextarea = function($textarea) {
      return $textarea.val("");
    };
    _showUserList = function($container, data) {
      return $container.find(".user-wrap").html(data);
    };
    _handleServerMessage = function() {
      socket.on("connect", function() {
        var account;
        console.log(socket.connected);
        account = new Account;
        return account.register();
      });
      socket.on("message", function(data) {
        return _getData(data);
      });
      socket.on("repeat", function() {
        var account;
        account = new Account;
        return account.reregister();
      });
      socket.on("systemMsg", function(data) {
        return _getSysData(data);
      });
      return socket.on("list", function(data) {
        var listHtml;
        listHtml = new User().appendList(data);
        return _showUserList(config.container, listHtml);
      });
    };
    _getSysData = function(data) {
      var tipHtml;
      tipHtml = new Message().appendSysMsg(data);
      return _showMsg(config.container, tipHtml);
    };
    _getData = function(data) {
      var msgHtml;
      msgHtml = new Message().appendMsg(data);
      return _showMsg(config.container, msgHtml);
    };
    _scrollBarPos = function($obj, $child) {
      var scrollTop, tempTop, top;
      tempTop = $child.outerHeight();
      top = $obj.outerHeight();
      scrollTop = top > tempTop ? top : tempTop;
      return $obj.scrollTop(scrollTop);
    };
    init = function($container, info) {
      config.container = $container;
      _createChatTpl($container, info);
      _handleServerMessage();
      return bind($container);
    };
    events = {
      _sendEvent: function(e) {
        var $this, message, msg;
        message = new Message;
        $this = $(this);
        msg = {
          name: "我",
          content: $this.siblings(".send-content").val()
        };
        if (message.validateMsg(msg.content)) {
          events._send(msg);
        } else {
          $this.siblings(".send-content").val("");
        }
        $this.siblings(".send-content").focus();
        return false;
      },
      _sendKeyEvent: function(e) {
        var $this, message, msg;
        message = new Message;
        if (e.which === 13) {
          $this = $(this);
          msg = {
            name: "我",
            content: $this.val()
          };
          if (message.validateMsg(msg.content)) {
            events._send(msg);
          } else {
            $this.val("");
          }
          $this.focus();
          return false;
        } else {

        }
      },
      _send: function(msg) {
        var message, msgHtml;
        message = new Message;
        message.sendMessage(msg);
        msgHtml = message.appendMsg(msg);
        return _showSelfMsg(config.container, msgHtml);
      },
      sendListener: function($container) {
        $container.on("click", ".btn-send", events._sendEvent);
        return $container.on("keyup", ".send-content", events._sendKeyEvent);
      }
    };
    bind = function($container) {
      return events.sendListener($container);
    };
    return module.exports = {
      init: init,
      send: events._send
    };
  });

}).call(this);
