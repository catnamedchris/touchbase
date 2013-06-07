define([ 'js/views/navbar' ], function( NavbarView ) {
  var AppView = Backbone.View.extend({
    el: '#app'
  , initialize: function( options ) {
      this.App = options.App;
      this.renderNav();
    }
  , renderNav: function() {
      this.navbarView = new NavbarView({ App: this.App });
      this.$el.append( this.navbarView.$el );
      this.navbarView.render();
    }
  , render: function( contentView ) {
      if ( this.contentView ) { this.removeContentView(); }
      this.contentView = contentView;
      this.$el.append( this.contentView.$el );
      this.contentView.render();
    }
  , removeContentView: function() {
      this.contentView.remove();
    }
  });

  return AppView;
});
