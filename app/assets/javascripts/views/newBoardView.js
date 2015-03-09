TrelloClone.Views.newBoardView = Backbone.View.extend({
  template: JST['new_board_view'],

  className: 'new-board-form',

  events: {
    'click #submit-button': 'submitNewBoard',
    'click #cancel-button': "removeForm"
  },

  render: function () {
    var formTemplate = this.template();

    this.$el.html(formTemplate);

    return this
  },

  submitNewBoard: function (event) {
    event.preventDefault();

    var attrs = this.$el.find('input').serializeJSON();
    console.log(attrs);

    var board = TrelloClone.Collections.boards.create(attrs, { wait: true });

    this.remove();
  },

  removeForm: function (event) {
    event.preventDefault();

    this.$el.html("<h2>Add new board</h2>");

    this.$el = $('div #temp');

    this.remove();
  }
});
