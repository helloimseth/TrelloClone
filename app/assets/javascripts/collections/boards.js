TrelloClone.Collections.Boards = Backbone.Collections.extend({
  url: "/api/boards",

  model: TrelloClone.Models.Board,

  getOrFetch: function (id) {
    var post = this.get(id);

    if (!post) {
      post = new TrelloClone.Models.Board({ id: id });
      this.add(post);
    }

    post.fetch();
    return post;
  }
});
