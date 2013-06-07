define([ 'text!js/templates/navbar.html' ], function( template ) {
  var Navbar = Backbone.View.extend({
    tagName: 'header'
  , template: _.template( template )
  , initialize: function( options ) {
      this.App = options.App;
    }
  , events: {
      'click li': 'navigate'
    }
  , render: function() {
      var self = this;

      this.delegateEvents();
      this.$el.html( this.template() );
    }
  , navigate: function( evt ) {
      evt.preventDefault();

      var href = $( evt.currentTarget ).find( 'a' ).attr( 'href' );
      this.App.router.navigate( href, { trigger: true } );
    }
  });

  return Navbar;
});
