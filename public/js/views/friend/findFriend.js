define([
  'text!js/templates/friendList.html'
, 'js/collections/foundFriends'
, 'js/views/friend/friend'
], function( template, FoundFriendsCollection, FriendView ) {
  var FindFriendView = Backbone.View.extend({
    className: 'find-friend'
  , template: _.template( template )
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.collection = new FoundFriendsCollection();
    }
  , events: {
      'keyup #who': 'findFriend'
    , 'click .friend-item': 'requestFriendAdd'
    }
  , render: function() {
      var self = this;

      this.delegateEvents();
      this.$el.html( this.template() );
    }
  , findFriend: function( evt ) {
      var self = this;
      this.collection.fetch({
        data: {
          name: $( evt.currentTarget ).val()
        }
      , error: function( collection, res, options ) {
          console.log( res );
        }
      , success: function( collection, res, options ) {
          var $friendList = self.$el.find( '.block-list' );
          $friendList.empty();
          collection.each(function( friend ) {
            var friendView = new FriendView( { model: friend, Pubsub: self.Pubsub } );
            $friendList.append( friendView.render().$el );

            return self;
          });
        }
      });
    }
  , requestFriendAdd: function( evt ) {
      evt.preventDefault();

      var $user = $( evt.currentTarget );
      confirm( 'Add ' + $user.find( '.friend-label' ).html() + ' as a friend?' );
    }
  });

  return FindFriendView;
});
