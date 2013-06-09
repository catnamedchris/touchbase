define([
  'js/router'
, 'js/views/app'
], function( Router, AppView ) {
  var App = function() {
    this.init = function() {
      this.Pubsub = _.extend({}, Backbone.Events);

      this.Models = {};

      this.Views = {};
      this.Views.root = new AppView({ App: this });

      this.router = new Router({ App: this });

      this.socket = io.connect( 'http://localhost:3000' );

      Backbone.history.start();
    };
  };

  return App;
});
