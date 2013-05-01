define([ 'views/auth/auth' ], function( AuthView ) {
  var App = function() {
    this.Pubsub = _.extend({}, Backbone.Events);

    this.Views = {};
    this.Views.authView = new AuthView({ Pubsub: this.Pubsub });

  };
  return App;
});
