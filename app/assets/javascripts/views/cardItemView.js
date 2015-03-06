TrelloClone.Views.CardItemView = Backbone.View.extend({
  template: JST['card_item_view'],

  tagName: 'li',

  render: function () {
    var templatedCard = this.template({
      card: this.model
    });

    this.$el.html(templatedCard);

    return this;
  }
});
