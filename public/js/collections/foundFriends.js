define([], function() {
  var FoundFriendsCollection = Backbone.Collection.extend({
    url: '/friend'
  });

  return FoundFriendsCollection;
});
