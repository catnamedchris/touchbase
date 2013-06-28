define([], function() {
  var MeetModel = Backbone.Model.extend({
    urlRoot: '/api/meet'
  , idAttribute: '_id'
  , defaults: {
      host: ''
    , what: ''
    , when: ''
    , where: ''
    , who: {
        attending: []
      , invited: []
      , declined: []
      }
    }
  });

  return MeetModel;
});
