define([
  'text!js/templates/meet/meetCard.html'
], function( meetCardTemplate ) {
  var MeetCardView = Backbone.View.extend({
    className: 'meet-card'
  , tagName: 'li'
  , template: _.template( meetCardTemplate )
  , events: {
      'click .btn--cancel': 'triggerCancelMeet'
    , 'click .btn--join': 'triggerJoinMeet'
    }
  , initialize: function( options ) {
      this.App = options.App;
      this.filter = options.filter;
    }
  , render: function() {
      var model = this.model.clone();
      model.set( 'filter', this.filter );
      this.$el.html( this.template( model.toJSON() ) );
      return this;
    }
  , triggerCancelMeet: function() {
      var self = this;
      if ( this.model.get( 'host') === this.App.Views.root.model.get( 'username' ) ) {
        self.model.destroy({
          error: function( model, response, options ) {
            console.dir( res );
          }
        , success: function( model, xhr, options ) {
            self.remove();
            self.App.Pubsub.trigger( 'cancel:meet', self.model );
          }
        });
      }
    }
  , triggerJoinMeet: function() {
      var user = this.App.Views.root.model.get( 'username' )
        , who = this.model.get( 'who' );

      who.attending.push( user );
      who.invited = _.without( who.invited, user );
      var self = this;
      this.model.save({
        error: function( model, res, options ) {
          console.dir( res );
        }
      , success: function( model, xhr, options ) {
          console.log( 'Success joining meet.' );
          self.remove();
          self.App.Pubsub.trigger( 'update:meets' );
        }
      });
    }
  });

  return MeetCardView;
});
