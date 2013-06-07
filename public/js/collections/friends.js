define([
  'js/models/user/userListItem'
], function( UserListItemModel ) {
  var FriendCollection = Backbone.Collection.extend({
    url: '/user/friends'
  , model: UserListItemModel
  });

  return FriendCollection;
});
