define([
  'js/router'
, 'js/views/app'
], function( Router, AppView ) {
  var App = function() {
    this.init = function() {
      this.Pubsub = _.extend({}, Backbone.Events);

      this.socket = io.connect( window.location.origin );

      this.Models = {};

      this.Views = {};
      this.Views.root = new AppView({ App: this });

      this.router = new Router({ App: this });


      Backbone.history.start({ pushState: true });
    };
  };

  return App;
});
