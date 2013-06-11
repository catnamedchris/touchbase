define([
  'js/models/user/user'
], function( UserModel ) {
  var FoundFriendsCollection = Backbone.Collection.extend({
    url: '/api/users/search'
  , model: UserModel
  });

  return FoundFriendsCollection;
});
