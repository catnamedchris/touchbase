define([
  'js/models/user/userListItem'
], function( UserListItemModel ) {
  var FoundFriendsCollection = Backbone.Collection.extend({
    url: '/friend'
  , model: UserListItemModel
  });

  return FoundFriendsCollection;
});
