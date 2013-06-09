define([
  'text!js/templates/user/userProfile.html'
, 'js/models/user/user'
], function( userProfileTemplate, UserModel ) {
  var UserProfileView = Backbone.View.extend({
    className: 'user-profile'
  , template: _.template( userProfileTemplate )
  , initialize: function( options ) {
      this.App = options.App;

      var attributes = this.App.Models.userListItem.attributes;
      this.model = new UserModel( attributes );
    }
  , events: {
      'click .btn--add-friend.btn--positive': 'requestAddFriend'
    }
  , render: function() {
      var self = this;
      this.model.fetch({
        error: function( model, res, options ) {
          console.log( res );
        }
      , success: function( model, res, options ) {
          self.$el.html( self.template( model.toJSON() ) );
        }
      });
    }
  , requestAddFriend: function() {
      var self = this;
      this.App.socket.emit('request:addFriend', {
        requesteeId: self.model.get( '_id' )
      , requesterId: self.App.Views.root.model.get( '_id' )
      });
      this.App.socket.on('processed:addFriend', function() {
        console.log( 'add friend request successfully sent' );
        self.render();
        self.App.Views.root.model.fetch();
        console.log( 'logged-in user\'s model...', self.App.Views.root.model );
      });
    }
  });

  return UserProfileView;
});
