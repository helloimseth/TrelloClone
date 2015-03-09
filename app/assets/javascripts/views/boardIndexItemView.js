TrelloClone.Views.BoardIndexItemView = Backbone.View.extend({
  template: JST['board_index_item_view'],

  tagName: 'li',

  className: 'board-item',

  events: {
    "click": "visitShow",
    "click #delete-board": "deleteBoard"
  },

  render: function () {
    var templatedBoardItem = this.template({
      board: this.model
    });

    this.$el.html(templatedBoardItem);

    return this;
  },

  deleteBoard: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  visitShow: function (event) {
    event.preventDefault();
    if ($(event.target).prop("id") !== "delete-board") {
      var url = "#/boards/" + this.model.id;

      Backbone.history.navigate(url, {
        trigger: true
      });
    }
  }
})
