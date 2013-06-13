define([], function() {
  var MeetModel = Backbone.Model.extend({
    defaults: {
      filters: [
        'Attending'
      , 'Invited'
      , 'Cancelled'
      ]
    , activeFilter: 0
    }
  });

  return MeetModel;
});
