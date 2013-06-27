define([
  'js/views/header/header'
, 'js/views/meet/meetsAttending'
], function( HeaderView, MeetsAttendingView ) {
  var MeetsView = Backbone.View.extend({
    className: 'meets'
  , initialize: function( options ) {
      this.App = options.App;
      this.headerView = new HeaderView({ App: this.App });
      this.meetsAttendingView = new MeetsAttendingView({ App: this.App });
    }
  , render: function() {
      this.$el.append( this.headerView.el );
      this.$el.append( this.meetsAttendingView.el );

      this.headerView.render();
      this.meetsAttendingView.render();

      return this;
    }
  });

  return MeetsView;
});
