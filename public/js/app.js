define([ 'js/views/app', 'js/router' ], function( AppView, Router ) {
  var App = function() {
    this.init = function() {
      this.Pubsub = _.extend({}, Backbone.Events);

      this.Models = {};

      this.Views = {};
      this.Views.root = new AppView({ App: this });

      this.router = new Router({ App: this });

      Backbone.history.start();
    };
  };

  return App;
});
