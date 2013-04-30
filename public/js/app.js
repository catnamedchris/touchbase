define([ 'views/auth/account' ], function( AccountView ) {
  var App = function() {
    this.Pubsub = _.extend({}, Backbone.Events);

    this.Views = {};
    this.Views.accountView = new AccountView({ Pubsub: this.Pubsub });

  };
  return App;
});
