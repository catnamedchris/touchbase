define([], function() {
  var AppView = Backbone.View.extend({
    el: '#app'
  , initialize: function( options ) {
      this.App = options.App;

      this.App.Pubsub.on( 'loggedIn', this.removeChildView, this );
    }
  , render: function( view ) {
      if ( this.view ) { this.removeChildView(); }
      this.view = view;
      this.$el.append( view.$el );
      view.render();
    }
  , removeChildView: function() {
      this.view.remove();
    }
  });

  return AppView;
});
