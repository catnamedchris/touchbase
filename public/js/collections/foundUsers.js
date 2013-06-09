define([
  'js/models/user/user'
], function( UserModel ) {
  var FoundFriendsCollection = Backbone.Collection.extend({
    url: '/friend'
  , model: UserModel
  });

  return FoundFriendsCollection;
});
