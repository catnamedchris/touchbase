define([], function() {
  var MeetModel = Backbone.Model.extend({
    urlRoot: '/api/meet'
  , idAttribute: '_id'
  , defaults: {
      host: ''
    , what: ''
    , when: ''
    , where: ''
    , who: []
    }
  });

  return MeetModel;
});
