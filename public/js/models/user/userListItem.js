define([], function() {
  var UserListItemModel = Backbone.Model.extend({
    defaults: {
      _id: ''
    , username: ''
    }
  });

  return UserListItemModel;
});
