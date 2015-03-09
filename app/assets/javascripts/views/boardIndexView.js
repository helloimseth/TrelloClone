TrelloClone.Views.BoardIndexView = Backbone.CompositeView.extend({
  template: JST['board_index_view'],

  tagName: 'article',

  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render)
  },

  events: {
    'click #new-board': "renderNewView"
  },

  render: function () {
    var indexTemplate = this.template();

    this.$el.html(indexTemplate);

    this.renderBoardList();

    this.addBoardLi();

    return this
  },

  renderBoardList: function () {
    this.collection.each(function (board) {

      var boardIndexItemView = new TrelloClone.Views.BoardIndexItemView({
        model: board
      })

      this.addSubview('#board-list', boardIndexItemView);
    }.bind(this))
  },

  addBoardLi: function () {
    var $createLi = $('<li>').html("<h2>Add new board</h2>")
                             .addClass("board-item")
                             .addClass("new-board-li")
                             .prop("id", "new-board");
    this.$el.find('#board-list').append($createLi);
  },

  renderNewView: function () {
    var newBoardForm = new TrelloClone.Views.newBoardView({
      el: this.$el.find('#new-board')
    });
    newBoardForm.render();
    $('#board-title').focus();
  }

});
