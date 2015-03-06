TrelloClone.Views.BoardListItemView = Backbone.CompositeView.extend({
  template: JST['board_list_item_view'],

  tagName: 'li',

  events: {
    "click #delete-list": "deleteList",
    "click .new-card-li": "addNewCardForm",
    "submit .add-card-form": "addNewCard"
  },

  initialize: function () {
    this.$cardList = this.$el.find('#card-list');

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
  },

  addCreateLi: function () {
    var $createLi = $('<li>').text("Add new card").addClass("new-card-li");
    this.$el.find('#card-list').append($createLi);
  },

  addNewCardForm: function (event) {
    this.$addACard = $(event.currentTarget);
    this.$addACard.remove();

    var newCardForm = new TrelloClone.Views.NewCardFormView({
      model: this.model
    });

    this.$el.find('#card-list').append($('<li>').html(newCardForm.render().$el));
    this.$el.find('.card-title').focus().select();
  },

  addNewCard: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();

    this.model.cards().create(attrs, {
      wait: true
    })
  },

  deleteList: function (event) {
    this.model.destroy()
    this.remove()
  }
});
