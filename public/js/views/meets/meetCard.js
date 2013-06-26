define([
  'text!js/templates/meetCard.html'
], function( meetCardTemplate ) {
  var MeetCardView = Backbone.View.extend({
    className: 'meetCard'
  , template: _.template( meetCardTemplate )
  , initialize: function( options ) {
      this.App = options.App;
    }
  , render: function() {
      console.log(this.model);
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  return MeetCardView;
});
