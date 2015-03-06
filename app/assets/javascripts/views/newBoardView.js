TrelloClone.Views.newBoardView = Backbone.View.extend({
  template: JST['new_board_view'],

  tagName: 'form',

  className: 'new-board-form',

  events: {
    'submit': 'submitNewBoard'
  },

  render: function () {
    var formTemplate = this.template();

    this.$el.html(formTemplate);

    return this
  },

  submitNewBoard: function (event) {
    event.preventDefault();

    var attrs = this.$el.serializeJSON();

    var board = TrelloClone.Collections.boards.create(attrs, { wait: true });

    this.remove();
  }
});
