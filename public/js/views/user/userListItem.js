define([
  'text!js/templates/user/userListItem.html'
], function( userListItemTemplate ) {
  var UserView = Backbone.View.extend({
    tagName: 'li'
  , className: 'user-item'
  , template: _.template( userListItemTemplate )
  , initialize: function( options ) {
      this.App = options.App;
    }
  , events: {
      'click': 'getUserProfile'
    }
  , render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  , getUserProfile: function( evt ) {
      evt.preventDefault();

      var href = this.$el.find( 'a' ).attr( 'href' );
      this.App.Models.userListItem = this.model;
      this.App.router.navigate( href, { trigger: true } );
    }
  });

  return UserView;
});
