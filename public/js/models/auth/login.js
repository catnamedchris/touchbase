define([], function() {
  var LoginModel = Backbone.Model.extend({
    url: '/login'
  , defaults: {
      username: ''
    , password: ''
    }
  , validate: function( attrs, options ) {
      if ( !attrs.username || !attrs.password ) {
        return 'Username and password cannot be empty.';
      }
    }
  });

  return LoginModel;
});
