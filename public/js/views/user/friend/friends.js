define([
  'js/views/header/headerFriends'
, 'js/views/user/friend/friendList'
, 'js/views/user/friend/friendFinder'
], function( HeaderFriendsView, FriendListView, FriendFinderView ) {
  var FriendsView = Backbone.View.extend({
    className: 'friends'
  , initialize: function( options ) {
      this.App = options.App;
      this.views = {};
      this.views.header = new HeaderFriendsView({ App: this.App });
      this.views.friendList = new FriendListView({ App: this.App });
      this.views.friendFinder = new FriendFinderView({ App: this.App });

      this.views.current = this.views.friendList;
    }
  , render: function( options ) {
      this.delegateEvents();
      this.$el.append( this.views.header.el );
      this.views.header.render();

      var filter = options.filter || '';
      this.renderChildView( filter );
    }
  , renderChildView: function( filterPath ) {
      this.views.current.remove();
      switch( filterPath ) {
        case 'find':
          this.views.current = this.views.friendFinder;
          this.$el.append( this.views.friendFinder.$el );
          break;
        case '':
        default:
          this.views.current = this.views.friendList;
          this.$el.append( this.views.friendList.$el );
          break;
      }
      this.views.current.render();
    }
  });

  return FriendsView;
});
