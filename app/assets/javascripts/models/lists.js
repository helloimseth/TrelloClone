TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "/api/lists",

  model: TrelloClone.Models.List,

  initialize: function (options) {
    this.board_id = options.id;
  }
});
