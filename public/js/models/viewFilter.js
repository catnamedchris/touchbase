define([], function() {
  var ViewFilterModel = Backbone.Model.extend({
    defaults: {
      filters: []
    , activeFilter: 0
    }
  });

  return ViewFilterModel;
});
