define([], function() {
  var UserModel = Backbone.Model.extend({
    urlRoot: '/user'
  , idAttribute: '_id'
  , defaults: {
      username: ''
    , email: ''
    , friends: []
    , friendRequests: {
        received: []
      , sent: []
      }
    }
  });

  return UserModel;
});
