TrelloClone.Views.CardItemView = Backbone.View.extend({
  template: JST['card_item_view'],

  tagName: 'li',

  className: 'card-item',

  initialize: function () {
    this.$el.data("ord", this.model.get('ord'))
            .data("id", this.model.id)
  },

  render: function () {
    var templatedCard = this.template({
      card: this.model
    });

    this.$el.html(templatedCard);

    return this;
  }
});
