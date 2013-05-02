define([ 'views/app', 'router' ], function( AppView, Router ) {
  var App = function() {
    this.init = function() {
      this.Pubsub = _.extend({}, Backbone.Events);

      this.Views = {};
      this.Views.rootView = new AppView({ App: this });

      this.Router = new Router({
        appViews: this.Views
      , Pubsub: this.Pubsub
      });
      Backbone.history.start();
    };
  };

  return App;
});
