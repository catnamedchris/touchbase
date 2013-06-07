define([
  'text!js/templates/user/userList.html'
, 'js/collections/foundUsers'
, 'js/views/user/userListItem'
], function( userListTemplate, FoundUsersCollection, UserListItemView ) {
  var FriendFinderView = Backbone.View.extend({
    className: 'find-friend'
  , template: _.template( userListTemplate )
  , initialize: function( options ) {
      this.App = options.App;
      this.collection = new FoundUsersCollection();
    }
  , events: {
      'keyup #who': 'findFriend'
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
          var $userList = self.$el.find( '.user-list' );
          $userList.empty();
          collection.each(function( user ) {
            var userListItemView = new UserListItemView({
              model: user
            , App: self.App
            });
            $userList.append( userListItemView.render().$el );
          });
        }
      });
    }
  });

  return FriendFinderView;
});
