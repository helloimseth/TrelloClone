TrelloClone.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['board_show_view'],

  tagName: 'article',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click #index-button": "returnToIndex"
  },

  render: function () {
    var templatedBoardShow = this.template({
      board: this.model
    });

    // eventually add lists

    this.$el.html(templatedBoardShow);

    return this;
  },

  returnToIndex: function (event) {
    Backbone.history.navigate("", {
      trigger: true
    });
  }
});
