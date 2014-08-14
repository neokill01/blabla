(function() {
  define(function(require, exports, module) {
    var User, userTpl, _createList, _createListHeader;
    userTpl = {
      item: "<li class=\"user-item\" data-name=\"{{nickname}}\">\n  <img src=\"/dist/res/avatar-default.png\" title=\"{{nickname}}\">\n  <label class=\"user-name\">{{nickname}}</label>\n</li>",
      list: "<ul class=\"user-list\">\n{{#users}}\n  <li data-name=\"{{nickname}}\" class=\"user-item\">\n    <img class=\"user-avatar\" src=\"/dist/res/avatar-default.png\" title=\"{{nickname}}\">\n    <label class=\"user-name\">{{nickname}}</label>\n  </li>\n{{/users}}\n{{^users}}\n  <p class=\"sys-no-result\">没有用户</p>\n{{/users}}\n</ul>",
      listheader: "<header class=\"list-header\"><h3>在线用户：{{total}}</h3></header>"
    };
    _createListHeader = function(data) {
      return Mustache.render(userTpl.listheader, data);
    };
    _createList = function(data) {
      var headerHtml, listHtml;
      headerHtml = _createListHeader(data);
      listHtml = Mustache.render(userTpl.list, data);
      return headerHtml + listHtml;
    };
    User = (function() {
      function User() {}

      User.prototype.appendList = function(users) {
        var data;
        data = {
          users: users,
          total: users.length
        };
        return _createList(data);
      };

      return User;

    })();
    return module.exports = User;
  });

}).call(this);
