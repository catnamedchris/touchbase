define([
  'text!js/templates/meet/meetCard.html'
], function( meetCardTemplate ) {
  var MeetCardView = Backbone.View.extend({
    className: 'meet-card'
  , tagName: 'li'
  , template: _.template( meetCardTemplate )
  , initialize: function( options ) {
      this.App = options.App;
    }
  , render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  return MeetCardView;
});
