TrelloClone.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['board_show_view'],

  tagName: 'article',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.lists(), "sync remove", this.render)
  },

  events: {
    "click #index-button": "returnToIndex",
    "click #add-list": "renderNewListInput",
    "blur input": "createNewList"
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

  renderNewListInput: function (event) {
    this._$newListButton = $(event.currentTarget);
    $(event.currentTarget).remove()

    var $input = $('<input>').val('New List Title')

    $('#index-button').after($input);

    $input.focus().select();
  },

  createNewList: function (event) {
    var title = $(event.currentTarget).val();
    $(event.currentTarget).remove();

    $('#index-button').after(this._$newListButton);

    this.model.lists().create({
      title: title,
      ord: 0,
      board_id: this.model.id
    })
  },

  returnToIndex: function (event) {
    Backbone.history.navigate("", {
      trigger: true
    });
  }
});
