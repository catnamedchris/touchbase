define([
  'text!js/templates/headerMeetMaker.html'
], function( headerMeetMakerTemplate ) {
  var HeaderMeetMaker = Backbone.View.extend({
    tagName: 'header'
  , className: 'action-bar grid header--meet-maker'
  , template: _.template( headerMeetMakerTemplate )
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template() );
    }
  });

  return HeaderMeetMaker;
});
