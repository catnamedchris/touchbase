define([
  'js/views/headerMeetMaker'
, 'js/views/tabSwitcher'
], function( HeaderMeetMakerView, TabSwitcherView ) {
  var MeetMaker = Backbone.View.extend({
    className: 'meet-maker'
  , initialize: function( options ) {
      this.App = options.App;
      this.views = {};
      this.views.header = new HeaderMeetMakerView({ App: this.App });
      this.views.tabSwitcher = new TabSwitcherView({ App: this.App });
    }
  , render: function() {
      this.delegateEvents();
      this.$el.append( this.views.header.el );
      this.$el.append( this.views.tabSwitcher.el );

      this.views.header.render();
      this.views.tabSwitcher.render();
    }
  });

  return MeetMaker;
});
