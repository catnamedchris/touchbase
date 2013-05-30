define([
  'text!js/templates/friendList.html'
, 'js/collections/friends'
, 'js/views/friend/friend'
], function( template, FriendsCollection, FriendView ) {
  var FriendsView = Backbone.View.extend({
    className: 'friends'
  , template: _.template( template )
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.collection = new FriendsCollection();

      this.Pubsub.on( 'select:friend', this.appendInput, this);
      this.Pubsub.on( 'deselect:friend', this.removeInput, this);
    }
  , render: function() {
      var self = this;

      this.delegateEvents();
      this.$el.html( this.template() );
      this.collection.fetch({
        error: function( collection, res, options ) {
          console.log( res );
        }
      , success: function( collection, res, options ) {
          var $friendList = self.$el.find( '.block-list' );
          collection.each(function( friend ) {
            var friendView = new FriendView( { model: friend, Pubsub: self.Pubsub } );
            $friendList.append( friendView.render().$el );

            return self;
          });
        }
      });
    }
  , appendInput: function( username ) {
      var $who = this.$el.find( '#who' );
      $who.val( $who.val() + username + ' ');
    }
  , removeInput: function( username ) {
      var $who = this.$el.find( '#who' );
      $who.val( $who.val().replace(new RegExp('\\b' + username + '\\s+', 'g'), '') );
    }
  });

  return FriendsView;
});
