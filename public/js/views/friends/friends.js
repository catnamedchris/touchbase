define([ 'js/collections/friends' ], function( FriendsCollection ) {
  var FriendsView = Backbone.View.extend({
    el: '.friends'
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.collection = new FriendsCollection();
      this.render();
    }
  , render: function() {
      var self = this;
      this.collection.fetch({
        error: function( collection, res, options ) {
          console.log( res );
        }
      , success: function( collection, res, options ) {
          self.collection.each(function( user ) {
            self.$el.find( '.block-list' ).append('<li>' + user.attributes.username + '</li>');
          });
        }
      });
      return this;
    }
  });

  return FriendsView;
});
