define([
  'js/lib/validator'
], function( Validator ) {
  var UserModel = Backbone.Model.extend({
    urlRoot: '/api/user'
  , idAttribute: 'username'
  , defaults: {
      username: ''
    , email: ''
    , password: ''
    , avatar: 'http://www.placecage.com/150/150'
    , friends: []
    , friendRequests: {
        received: []
      , sent: []
      }
    }
  , validate: function( attrs, options ) {
      if ( options.validateSignup ) {
        var validator = new Validator();
        validator.checkEmail( attrs.email );
        validator.checkUsername( attrs.username );
        validator.checkPassword( attrs.password );
        if ( validator.hasErrors() ) {
          return validator.errors;
        }
      }
    }
  });

  return UserModel;
});
