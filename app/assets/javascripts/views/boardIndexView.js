TrelloClone.Views.BoardIndexView = Backbone.CompositeView.extend({
  template: JST['board_index_view'],

  tagName: 'article',

  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render)
  },

  render: function () {
    var indexTemplate = this.template();

    this.collection.each(function (board) {
      var boardIndexItemView = new TrelloClone.Views.BoardIndexItemView({
        model: board
      })

      this.addSubview('#board-list', boardIndexItemView);
    }.bind(this))

    return this
  }
});
