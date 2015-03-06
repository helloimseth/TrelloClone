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

  renderNewView: function () {
    var newBoardForm = new TrelloClone.Views.newBoardView();
    this.$el.prepend(newBoardForm.render().$el)
    $('#board-title').focus();
  }

});
