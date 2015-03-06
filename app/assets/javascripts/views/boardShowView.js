TrelloClone.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['board_show_view'],

  tagName: 'article',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click #index-button": "returnToIndex",
    "click #add-list": "createNewList"
  },

  render: function () {
    var templatedBoardShow = this.template({
      board: this.model
    });

    this.$el.html(templatedBoardShow);

    this.renderListsList();

    return this;
  },

  renderListsList: function () {
    this.model.lists().each(function (list) {
      var boardListItemView = new TrelloClone.Views.BoardListItemView({
        model: list
      })

      this.addSubview('#lists-list', boardListItemView);
    }.bind(this))
  },

  createNewList: function (event) {
    this.$newListButton = $(event.currentTarget);
    $(event.currentTarget).remove()

    $('#index-button').after($('<input>').val('New List').focus());
  },

  returnToIndex: function (event) {
    Backbone.history.navigate("", {
      trigger: true
    });
  }
});
