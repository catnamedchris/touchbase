define([
  'js/views/user/friend/friendList'
, 'js/views/user/friend/friendFinder'
, 'js/views/user/userProfile'
, 'js/views/meets/meets'
], function( FriendListView, FriendFinderView, UserProfileView, MeetsView ) {
  var Router = Backbone.Router.extend({
    routes: {
      ''               : 'showMeets'
    , 'friends'        : 'showFriendList'
    , 'find-friend'    : 'showFriendFinder'
    , 'user/:username' : 'showUserProfile'
    }
  , initialize: function( options ) {
      this.App = options.App;
      this.Views = this.App.Views;
    }
  , showMeets: function() {
      var meets = this.Views.meets;
      meets = meets || new MeetsView({ App: this.App });
      this.Views.root.render( meets );
    }
  , showFriendList: function() {
      var friendList = this.Views.friendList;
      friendList = friendList || new FriendListView({ App: this.App });
      this.Views.root.render( friendList );
    }
  , showFriendFinder: function() {
      var friendFinder = this.Views.friendFinder;
      friendFinder = friendFinder || new FriendFinderView({ App: this.App });
      this.Views.root.render( friendFinder );
    }
  , showUserProfile: function( username ) {
      var userProfile = this.Views.userProfile;
      userProfile = userProfile || new UserProfileView({
        App: this.App
      , username: username
      });
      this.Views.root.render( userProfile );
    }
  });

  return Router;
});
