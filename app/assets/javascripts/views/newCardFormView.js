TrelloClone.Views.NewCardFormView = Backbone.View.extend({
  template: JST['new_card_form_view'],

  tagName: 'form',

  className: 'add-card-form',

  render: function () {

    var newCardForm = this.template({
      list: this.model
    });

    this.$el.html(newCardForm);

    return this;
  }

})
