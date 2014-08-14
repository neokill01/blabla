define (require, exports, module) ->
  userTpl =
    item: """
      <li class="user-item" data-name="{{nickname}}">
        <img src="/dist/res/avatar-default.png" title="{{nickname}}">
        <label class="user-name">{{nickname}}</label>
      </li>
    """
    list: """
      <ul class="user-list">
      {{#users}}
        <li data-name="{{nickname}}" class="user-item">
          <img class="user-avatar" src="/dist/res/avatar-default.png" title="{{nickname}}">
          <label class="user-name">{{nickname}}</label>
        </li>
      {{/users}}
      {{^users}}
        <p class="sys-no-result">没有用户</p>
      {{/users}}
      </ul>
    """

    listheader: """
      <header class="list-header"><h3>在线用户：{{total}}</h3></header>
    """

  _createListHeader = (data) ->
    Mustache.render(userTpl.listheader, data)

  _createList = (data)->
    headerHtml = _createListHeader(data)
    listHtml = Mustache.render(userTpl.list, data)
    return headerHtml + listHtml

  class User
    constructor: ->

    appendList: (users)->
      data =
        users: users
        total: users.length
      _createList data

  module.exports = User
