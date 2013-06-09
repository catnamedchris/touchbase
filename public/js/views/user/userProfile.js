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
  });

  return UserProfileView;
});
