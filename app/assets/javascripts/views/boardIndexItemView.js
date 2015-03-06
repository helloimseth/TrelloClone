TrelloClone.Views.BoardIndexItemView = Backbone.View.extend({
  template: JST['board_index_item_view'],

  tagName: 'li',

  render: function () {
    var templatedBoardItem = this.template({
      board: this.model
    });

    this.$el.html(templatedBoardItem);

    return this;
  }
})
