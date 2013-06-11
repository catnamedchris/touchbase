define([
  'js/models/user/user'
], function( UserModel ) {
  var FriendCollection = Backbone.Collection.extend({
    url: '/api/user/friends'
  , model: UserModel
  });

  return FriendCollection;
});
