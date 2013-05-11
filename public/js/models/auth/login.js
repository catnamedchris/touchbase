define([], function() {
  var LoginModel = Backbone.Model.extend({
    url: '/login'
  , defaults: {
      email: ''
    , password: ''
    }
  , validate: function( attrs, options ) {
      if ( !attrs.email || !attrs.password ) {
        return 'Email and password cannot be empty.';
      }
    }
  });

  return LoginModel;
});
