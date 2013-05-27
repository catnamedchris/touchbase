define([
  'js/views/friend/friendList'
], function( FriendListView ) {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'showFriends'
    , '/': 'showFriends'
    }
  , initialize: function( options ) {
      this.appViews = options.appViews;
      this.rootView = this.appViews.rootView;

      this.Pubsub = options.Pubsub;
    }
  , showFriends: function() {
      this.appViews.friendListView = this.appViews.friendListView || new FriendListView({ Pubsub: this.Pubsub });
      this.rootView.render( this.appViews.friendListView );
    }
  });

  return Router;
});
