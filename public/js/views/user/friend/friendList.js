define([
  'text!js/templates/user/userList.html'
, 'js/collections/friends'
, 'js/views/user/friend/friendListItem'
], function( userListTemplate, FriendCollection, FriendListItemView ) {
  var FriendListView = Backbone.View.extend({
    className: 'friend-list'
  , template: _.template( userListTemplate )
  , initialize: function( options ) {
      this.App = options.App;
      this.collection = new FriendCollection();

      this.App.Pubsub.on( 'select:friend', this.appendInput, this);
      this.App.Pubsub.on( 'deselect:friend', this.removeInput, this);
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
          var $friendList = self.$el.find( '.user-list' );
          collection.each(function( friend ) {
            var friendListItemView = new FriendListItemView({
              model: friend
            , App: self.App
            });
            $friendList.append( friendListItemView.render().$el );
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

  return FriendListView;
});
