define([], function() {
  var SignupModel = Backbone.Model.extend({
    url: '/signup'
  , defaults: {
      firstName: ''
    , lastName: ''
    , email: ''
    , password: ''
    }
  , validate: function( attrs, options ) {
      // TODO: Fill this in, stupid.
    }
  });

  return SignupModel;
});
