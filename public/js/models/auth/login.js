define([ 'js/lib/validator' ], function( Validator ) {
  var LoginModel = Backbone.Model.extend({
    url: '/login'
  , defaults: {
      username: ''
    , password: ''
    }
  , validate: function( attrs, options ) {
      var validator = new Validator();
      validator.checkUsername( attrs.username );
      validator.checkPassword( attrs.password );
      if ( validator.hasErrors() ) {
        return validator.errors;
      }
    }
  });

  return LoginModel;
});
