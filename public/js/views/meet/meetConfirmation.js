define([
  'text!js/templates/meet/meetConfirmation.html'
], function( meetConfirmationTemplate ) {
  var MeetConfirmation = Backbone.View.extend({
    className: 'confirmation'
  , tagName: 'div'
  , template: _.template( meetConfirmationTemplate )
  , events: {
      'click .create-meet': 'createMeet'
    }
  , initialize: function( options ) {
      this.App = options.App;
    }
  , render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  , createMeet: function() {
      var self = this;
      var attrs = this.model.attributes;

      this.model.save(attrs, {
        error: function( model, res, options ) {
          console.log( 'Meet creation failed.' );
          console.dir( res );
        }
      , success: function( model, res, options ) {
          console.log( 'Meet creation successful.' );
          console.dir( res );

          self.App.socket.emit('request:meet', {
            invited: model.get( 'who' ).invited
          });

          window.location.href = '/';
        }
      });
    }
  });

  return MeetConfirmation;
});
