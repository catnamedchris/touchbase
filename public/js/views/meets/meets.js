define([
  'js/views/header'
, 'js/views/meets/meetCard'
], function( HeaderView, MeetCardView  ) {
  var MeetsView = Backbone.View.extend({
    className: 'meets'
  , initialize: function( options ) {
      this.App = options.App;
      this.headerView = new HeaderView({ App: this.App });
    }
  , render: function() {
      this.$el.append( this.headerView.el );
      this.headerView.render();
      return this;
    }
  });

  return MeetsView;
});
