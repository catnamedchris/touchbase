define([], function() {
  var FriendsCollection = Backbone.Collection.extend({
    url: '/user/friends'
  });

  return FriendsCollection;
});
