define([
  'text!js/templates/headerMeetMaker.html'
], function( headerMeetMakerTemplate ) {
  var HeaderMeetMaker = Backbone.View.extend({
    tagName: 'header'
  , className: 'action-bar grid header--meet-maker'
  , template: _.template( headerMeetMakerTemplate )
  , events: {
      'click .btn--next': 'triggerNextForm'
    , 'click .btn--done': 'triggerSubmitMeet'
    }
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;

      self.App.Pubsub.on( 'who-selected:meet-maker', this.updateNextBtn, this );
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template() );
    }
  , triggerNextForm: function( evt ) {
      evt.preventDefault();
      this.App.Pubsub.trigger( 'who-selected:meet-maker' );
    }
  , updateNextBtn: function() {
      this.$el.find( '.btn--next' )
        .removeClass( 'btn--next' )
        .addClass( 'btn--done' )
        .html( 'Done' );
    }
  , triggerSubmitMeet: function( evt ) {
      evt.preventDefault();
      this.App.Pubsub.trigger( 'done:meet-maker' );
    }
  });

  return HeaderMeetMaker;
});
