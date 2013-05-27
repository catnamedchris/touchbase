define([
  'js/collections/friends'
, 'js/views/friends/friend'
], function( FriendsCollection, FriendView ) {
  var FriendsView = Backbone.View.extend({
    el: '.friends .block-list'
  , initialize: function( options ) {
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
          collection.each(function( user ) {
            var friendView = new FriendView( user );
            self.$el.append( friendView.el.html() );
          });
        }
      });
      return this;
    }
  });

  return FriendsView;
});
