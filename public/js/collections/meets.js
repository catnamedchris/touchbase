define([
  'js/models/meet'
], function( MeetModel ) {
  var MeetCollection = Backbone.Collection.extend({
    model: MeetModel
  , initialize: function( options ) {
      switch ( options.type ) {
        case 'attending':
        default:
          this.url = '/api/meets/attending';
          break;
      }
    }
  });

  return MeetCollection;
});
