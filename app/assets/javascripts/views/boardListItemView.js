TrelloClone.Views.BoardListItemView = Backbone.View.extend({
  template: JST['board_list_item_view'],

  tagName: 'li',

  events: {
    "click #delete-list": "deleteList"
  },

  render: function () {
    var templatedListItem = this.template({
      list: this.model
    });

    this.$el.html(templatedListItem);

    return this;
  },

  deleteList: function (event) {
    this.remove()
    this.model.destroy()
  }
});
