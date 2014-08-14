// Generated by CoffeeScript 1.7.1
(function() {
  define(function(require, exports, module) {
    var Account;
    Account = (function() {
      function Account() {}

      Account.prototype.register = function() {
        var username;
        username = prompt("输入一个你喜欢的名字吧");
        while (!username) {
          username = prompt("输入一个你喜欢的名字吧");
        }
        return socket.emit("register", {
          nickname: username
        });
      };

      Account.prototype.reregister = function() {
        var username;
        username = prompt("昵称有重复，请重新输入");
        while (!username) {
          username = prompt("昵称有重复，请重新输入");
        }
        return socket.emit("register", {
          nickname: username
        });
      };

      Account.prototype.login = function() {};

      return Account;

    })();
    return module.exports = Account;
  });

}).call(this);

//# sourceMappingURL=accountController.map