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

    this.$el.find('#lists-list').sortable();
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

    $('#add-list').html($input)
                  .append($button)
                  .append($anchor);

    $input.focus().select();
  },

  createNewList: function (event) {
    event.preventDefault();

    var title = $('#title-input').val()

    $('#add-list').html("<h2>Add new list</h2>")

    this.model.lists().create({
      title: title,
      ord: 0,
      board_id: this.model.id
    })
  },

  removeNewListInput: function (event) {
    event.preventDefault();
    this.$el.find('#add-list').remove();
    this.addListLi();
  },

  returnToIndex: function (event) {
    Backbone.history.navigate("", {
      trigger: true
    });
  }
});
