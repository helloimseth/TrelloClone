TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index"
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

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
