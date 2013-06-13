define([
], function() {
  var MeetCardView = Backbone.View.extend({
    className: 'meetCard'
  , initialize: function( options ) {
      this.App = options.App;
    }
  });

  return MeetCardView;
});
