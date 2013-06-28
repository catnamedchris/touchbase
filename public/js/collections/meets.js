define([
  'js/models/meet'
], function( MeetModel ) {
  var MeetCollection = Backbone.Collection.extend({
    url: '/api/meets'
  , model: MeetModel
  });

  return MeetCollection;
});
