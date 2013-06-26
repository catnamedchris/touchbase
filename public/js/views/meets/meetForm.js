define([
  'text!js/templates/meetForm.html'
], function( meetFormTemplate ) {
  var MeetFormView = Backbone.View.extend({
    className: 'meet-maker__form'
  , template: _.template( meetFormTemplate )
  , initialize: function( options ) {
      this.App = options.App;

      this.App.Pubsub.on( 'done:meet-maker', this.finalizeMeetCreation, this  );
    }
  , events: {
      'keyup #what': 'updateMeetWhat'
    , 'keyup #where': 'updateMeetWhere'
    , 'keyup #when': 'updateMeetWhen'
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template() );
    }
  , updateMeetWhat: function( evt ) {
      this.model.set( 'what', evt.currentTarget.value );
    }
  , updateMeetWhere: function( evt ) {
      this.model.set( 'where', evt.currentTarget.value );
    }
  , updateMeetWhen: function( evt ) {
      this.model.set( 'when', evt.currentTarget.value );
    }
  , finalizeMeetCreation: function() {
      var attrs = this.model.attributes;
      this.model.save(attrs, {
        error: function( model, res, options ) {
          console.log( 'Meet creation failed.' );
          console.dir( res );
        }
      , success: function( model, res, options ) {
          console.log( 'Meet creation successful.' );
          console.dir( res );

          window.location.href = '/';
        }
      });
    }
  });

  return MeetFormView;
});
