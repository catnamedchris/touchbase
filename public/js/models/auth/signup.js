define([ 'js/lib/validator' ], function( Validator ) {
  var SignupModel = Backbone.Model.extend({
    url: '/user'
  , defaults: {
      email: ''
    , username: ''
    , password: ''
    }
  , validate: function( attrs, options ) {
      var validator = new Validator();
      validator.checkEmail( attrs.email );
      validator.checkUsername( attrs.username );
      validator.checkPassword( attrs.password );
      if ( validator.hasErrors() ) {
        return validator.errors;
      }
    }
  });

  return SignupModel;
});
