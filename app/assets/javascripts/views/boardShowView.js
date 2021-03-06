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
    "click #submit-list": "createNewList",
    "click #add-list #cancel-list": "removeNewListInput"
  },

  render: function () {
    var templatedBoardShow = this.template({
      board: this.model
    });

    this.$el.html(templatedBoardShow);

    this.$el.find('#lists-list').sortable({
      items: "> li:not(last-child)",
      update: this.changeListOrder
    });
    this.$el.find('#lists-list').disableSelection();

    this.renderListsList();

    this.addListLi();

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

  addListLi: function () {
    var $createLi = $('<li>').html("<h2>Add new list</h2>")
                             .addClass("list-item")
                             .addClass("new-list-li")
                             .prop("id", "add-list");
    this.$el.find('#lists-list').append($createLi);
  },

  renderNewListInput: function (event) {
    var $input = $('<input>').prop('placeholder','New List Title')
                             .prop("id", "title-input"),
        $button = $('<button>').text("Save")
                               .prop("id", "submit-list"),
        $anchor = $('<a>').attr('href', "javascript:void(0)")
                          .prop("id", "cancel-list")
                          .text("X");

    this.$('#add-list').html($input)
                       .append($button)
                       .append($anchor);

    $input.focus().select();
  },

  createNewList: function (event) {
    event.preventDefault();

    var title = $('#title-input').val()

    this.model.lists().create({
      title: title,
      ord: this.$el.find("#lists-list").children().length,
      board_id: this.model.id
    })
  },

  changeListOrder: function (event) {
    var children = $(event.target).children('.list-item')

    for(var i = 0; i < children.length; i++) {
      var id = $(children[i]).data("id");

      var list = new TrelloClone.Models.List({
        id: id,
        ord: i,
      });

      list.save();
    }
  },

  removeNewListInput: function (event) {
    event.stopPropagation();
    this.$el.find('#add-list').html("<h2>Add new list</h2>");
  },

  returnToIndex: function (event) {
    Backbone.history.navigate("", {
      trigger: true
    });
  }
});
