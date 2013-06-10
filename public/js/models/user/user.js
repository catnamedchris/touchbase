define([], function() {
  var UserModel = Backbone.Model.extend({
    urlRoot: '/api/user'
  , idAttribute: 'username'
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
