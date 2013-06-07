define([
  'js/views/friend/friendList'
, 'js/views/friend/findFriend'
], function( FriendListView, FindFriendView ) {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'showFriends'
    , '/': 'showFriends'
    , 'find-friend': 'findFriends'
    }
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.appViews = options.appViews;
      this.rootView = this.appViews.rootView;
    }
  , showFriends: function() {
      this.appViews.friendListView = this.appViews.friendListView || new FriendListView({ Pubsub: this.Pubsub });
      this.rootView.render( this.appViews.friendListView );
    }
  , findFriends: function() {
      this.appViews.findFriendView = this.appViews.findFriendView || new FindFriendView({ Pubsub: this.Pubsub });
      this.rootView.render( this.appViews.findFriendView );
    }
  });

  return Router;
});
