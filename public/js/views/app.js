define([
  'js/models/user/user'
, 'js/views/navbar'
], function( UserModel, NavbarView ) {
  var AppView = Backbone.View.extend({
    el: '#app'
  , initialize: function( options ) {
      this.App = options.App;
      this.model = new UserModel({
        username: $.cookie( 'username' )
      });
      this.model.fetch({
        error: function( model, res, options ) {
          console.log( 'Fetch logged-in user failed' );
        }
      , success: function( model, res, options ) {
          console.log( 'Fetch logged-in user successful' );
          console.dir( model );
        }
      });
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
      this.$el.prepend( this.contentView.$el );
      this.contentView.render();
    }
  , removeContentView: function() {
      this.contentView.remove();
    }
  });

  return AppView;
});
