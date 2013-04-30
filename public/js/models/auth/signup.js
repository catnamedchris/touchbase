define([], function() {
  var SignupModel = Backbone.Model.extend({
    url: '/signup'
  , validate: function( attrs, options ) {
      // TODO: Fill this in, stupid.
    }
  });

  return SignupModel;
});
