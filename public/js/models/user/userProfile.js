define([], function() {
  var UserProfileModel = Backbone.Model.extend({
    url: '/user'
  , defaults: {
      _id: ''
    , username: ''
    , email: ''
    }
  });

  return UserProfileModel;
});
