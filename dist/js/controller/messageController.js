(function() {
  define(function(require, exprots, module) {
    var Message, msgTpl, _createMsg, _createSysTip;
    msgTpl = {
      msgItem: "<li data-msgkey=\"\"><span class=\"user-name\">{{name}}：</span><article class=\"text-content\">{{content}}</article></li>",
      sysTip: "<li data-msgkey=\"\"><span class=\"user-name\">系统提示：</span><article class=\"text-content\">{{tip}}</article></li>"
    };
    _createMsg = function(msg) {
      return Mustache.render(msgTpl.msgItem, msg);
    };
    _createSysTip = function(msg) {
      var data;
      data = {
        tip: msg
      };
      return Mustache.render(msgTpl.sysTip, data);
    };
    Message = (function() {
      function Message() {}

      Message.prototype.getMessage = function(msg) {
        return console.log(msg);
      };

      Message.prototype.sendMessage = function(msg) {
        if (socket.connected) {
          return socket.emit("message", msg);
        } else {

        }
      };

      Message.prototype.validateMsg = function(text) {
        var flag;
        flag = $.trim(text) === "" ? false : true;
        return flag;
      };

      Message.prototype.appendMsg = function(msg) {
        return _createMsg(msg);
      };

      Message.prototype.appendSysMsg = function(msg) {
        return _createSysTip(msg);
      };

      return Message;

    })();
    return module.exports = Message;
  });

}).call(this);
