TrelloClone.Collections.Boards = Backbone.Collection.extend({
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
  },

  lists: function () {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists({
        board_id: this.id
      })

      this._lists.fetch();
    }

    return this._lists;
  }

  parse: function (response) {
    if (response.lists) {
      this.lists().set(response.lists);
      delete response.lists;
    }

    return response;
  }
});

TrelloClone.Collections.boards = new TrelloClone.Collections.Boards()
