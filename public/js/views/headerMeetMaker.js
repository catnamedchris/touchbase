define([
  'text!js/templates/headerMeetMaker.html'
, 'js/models/viewFilter'
], function( headerMeetMakerTemplate, ViewFilterModel ) {
  var HeaderMeetMaker = Backbone.View.extend({
    tagName: 'header'
  , className: 'action-bar grid header--meet-maker'
  , template: _.template( headerMeetMakerTemplate )
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;
      self.model = new ViewFilterModel({
        filters: [
          'What'
        , 'When'
        , 'Where'
        , 'Who'
        ]
      });
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template() );
    }
  });

  return HeaderMeetMaker;
});
