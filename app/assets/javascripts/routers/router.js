TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "boards/:id": "show"
  },

  initialize: function (options) {
    this.$rootEl = options.$el;
    TrelloClone.Collections.boards.fetch();
  },

  index: function () {
    var boardsIndexView = new TrelloClone.Views.BoardIndexView({
      collection: TrelloClone.Collections.boards
    });

    this._swapView(boardsIndexView);
  },

  show: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);

    var boardShowView = new TrelloClone.Views.BoardShowView({
      model: board
    })

    this._swapView(boardShowView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
