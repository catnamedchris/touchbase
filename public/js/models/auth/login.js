define([], function() {
  var LoginModel = Backbone.Model.extend({
    url: '/users'
  , validate: function( attrs, options ) {
      if ( !attrs.email || !attrs.password ) {
        return 'Email and password cannot be empty.';
      }
    }
  });

  return LoginModel;
});
