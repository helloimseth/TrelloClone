window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new TrelloClone.Routers.Router({
      $el: $('#main')
    })

    Backbone.history.start()
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
