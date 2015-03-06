TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "/api/lists",

  model: TrelloClone.Models.List,
});
