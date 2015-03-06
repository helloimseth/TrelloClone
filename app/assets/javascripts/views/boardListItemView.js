TrelloClone.Views.BoardListItemView = Backbone.CompositeView.extend({
  template: JST['board_list_item_view'],

  tagName: 'li',

  events: {
    "click #delete-list": "deleteList"
  },

  initialize: function () {
    this.listenTo(this.model.cards(), "sync remove", this.render)
  },

  render: function () {
    var templatedListItem = this.template({
      list: this.model
    });

    this.$el.html(templatedListItem);

    this.renderCardsList();

    this.addCreateLi();

    return this;
  },

  renderCardsList: function () {
    this.model.cards().each(function (card) {

      var cardItemView = new TrelloClone.Views.CardItemView({
        model: card
      })

      this.addSubview('#card-list', cardItemView);
    }.bind(this))
    console.log("renderCardsList: ", this.$el.find('#card-list') );
  },

  addCreateLi: function () {
    var $createLi = $('<li>').text("Add new card").addClass("new-card-li");
    this.$el.find('#card-list').append($createLi);
    console.log("addCreateLi: ", this.$el.find('#card-list') );

  },

  deleteList: function (event) {
    this.remove()
    this.model.destroy()
  }
});
