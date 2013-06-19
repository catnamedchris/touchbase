define([
  'js/views/headerMeetMaker'
], function( HeaderMeetMakerView ) {
  var MeetMaker = Backbone.View.extend({
    className: 'meet-maker'
  , initialize: function( options ) {
      this.App = options.App;
      this.views = {};
      this.views.header = new HeaderMeetMakerView({ App: this.App });
    }
  , render: function() {
      this.delegateEvents();
      this.$el.append( this.views.header.el );

      this.views.header.render();
    }
  });

  return MeetMaker;
});
