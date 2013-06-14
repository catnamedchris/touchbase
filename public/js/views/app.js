define([
  'js/models/user/user'
], function( UserModel ) {
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
