TrelloClone.Views.BoardListItemView = Backbone.CompositeView.extend({
  template: JST['board_list_item_view'],

  tagName: 'li',

  className: 'list-item',

  events: {
    "click #delete-list": "deleteList",
    "click .new-card-li": "addNewCardForm",
    "submit .add-card-form": "addNewCard",
    "click #cancel-card": "removeNewCardForm"
  },

  initialize: function () {
    this.$cardList = this.$el.find('#card-list');

    this.$el.data("id", this.model.id)
    this.$cardList.data("id", this.model.id)

    this.listenTo(this.model.cards(), "sync remove", this.render)
  },

  render: function () {
    var templatedListItem = this.template({
      list: this.model
    });

    this.$el.html(templatedListItem);

    this.renderCardsList();

    this.$el.find('#card-list').sortable({
      items:"> li:not(:last-child)",
      connectWith: ".card-list",
      update: this.changeCardOrder
    })

    this.$el.find('#card-list').disableSelection();

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

    this.newCardForm = new TrelloClone.Views.NewCardFormView({
      model: this.model
    });

    this.$el.find('#card-list').append($('<li>').html(this.newCardForm.render().$el));
    this.$el.find('.card-title').focus().select();
  },

  addNewCard: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();

    this.model.cards().create(attrs, {
      wait: true
    })
  },

  removeNewCardForm: function(event) {
    event.preventDefault();

    this.newCardForm.remove();

    this.addCreateLi();
  },

  changeCardOrder: function (event, ui) {
    var children = $(event.target).children('.card-item')

    for(var i = 0; i < children.length; i++) {
      var id = $(children[i]).data("id");

      var card = new TrelloClone.Models.Card({
        id: id,
        ord: i,
      });

      if (children[i]===ui.item[0]) {
        var newListId = ui.item.parent().data("id");
        card.set("list_id", newListId)
      }

      card.save();
    }
  },

  deleteList: function (event) {
    this.model.destroy()
    this.remove()
  }
});
