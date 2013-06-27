define([
  'js/collections/meets'
, 'js/views/meet/meetCard'
], function( MeetCollection, MeetCardView ) {
  var MeetsAttendingView = Backbone.View.extend({
    className: 'meets__attending block-list'
  , tagName: 'ul'
  , initialize: function( options ) {
      this.App = options.App;
      this.collection = new MeetCollection({ type: 'attending' });
    }
  , render: function() {
      var self = this;
      self.delegateEvents();

      self.collection.fetch({
        error: function( collection, res, options ) {
          console.dir( res );
        }
      , success: function( collection, res, options ) {
          console.log( 'Successfully fetched atending meets.' );
          collection.each(function( meet ) {
            var meetCardView = new MeetCardView({
              model: meet
            , App: self.App
            });
            self.$el.append( meetCardView.render().el );
          });
        }
      });
    }
  });

  return MeetsAttendingView;
});
