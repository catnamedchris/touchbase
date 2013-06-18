define([
  'js/views/meets/meets'
, 'js/views/user/friend/friends'
, 'js/views/user/userProfile'
], function( MeetsView, FriendsView, UserProfileView ) {
  var Router = Backbone.Router.extend({
    routes: {
      ''                  : 'showMeets'
    , 'friends(/:filter)' : 'showFriends'
    , 'user/:username'    : 'showUserProfile'
    }
  , initialize: function( options ) {
      this.App = options.App;
      this.Views = this.App.Views;
    }
  , showMeets: function() {
      this.Views.meets = this.Views.meets || new MeetsView({ App: this.App });
      this.Views.root.render( this.Views.meets );
    }
  , showFriends: function( filter ) {
      filter = filter || '';
      this.Views.friends = this.Views.friends || new FriendsView({ App: this.App });
      this.Views.root.render( this.Views.friends, { filter: filter } );
    }
  , showUserProfile: function( username ) {
      this.Views.userProfile = this.Views.userProfile || new UserProfileView({
        App: this.App
      , username: username
      });
      this.Views.root.render( this.Views.userProfile );
    }
  });

  return Router;
});
