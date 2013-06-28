define([
  'js/views/meet/meetCard'
], function( MeetCardView ) {
  var MeetsAttendingView = Backbone.View.extend({
    className: 'meets__attending block-list'
  , tagName: 'ul'
  , initialize: function( options ) {
      this.App = options.App;
      this.filter = 'Attending';

      this.App.Pubsub.on( 'filter:meets', this.render, this );
    }
  , render: function( filter ) {
      var self = this;
      self.$el.empty();
      self.delegateEvents();

      self.filter = ( filter ) ? filter : self.filter;

      var currentUser = self.App.Views.root.model.get( 'username' );
      self.collection.each(function( meet ) {
        var passFilter, isHost, isAttending;

        if ( self.filter === 'Attending' ) {
          isHost = meet.get( 'host' ) === currentUser;
          isAttending = _.contains( meet.get( 'who' ).attending, currentUser);
          passFilter = isHost || isAttending;
        } else if ( self.filter === 'Invited' ) {
          passFilter = _.contains( meet.get( 'who' ).invited, currentUser);
        } else {
          passFilter = _.contains( meet.get( 'who' ).declined, currentUser);
        }

        if ( passFilter ) {
          var meetCardView = new MeetCardView({
            model: meet
          , App: self.App
          });
          self.$el.append( meetCardView.render().el );
        }
      });
    }
  });

  return MeetsAttendingView;
});
