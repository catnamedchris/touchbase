define([
  'js/collections/meets'
, 'js/views/header/header'
, 'js/views/meet/meetsAttending'
], function( MeetCollection, HeaderView, MeetsAttendingView ) {
  var MeetsView = Backbone.View.extend({
    className: 'meets'
  , initialize: function( options ) {
      this.App = options.App;

      this.collection = new MeetCollection();

      this.views = {};
      this.views.header = new HeaderView({ App: this.App });
      this.views.meetingsAttending = new MeetsAttendingView({
        App: this.App
      , collection: this.collection
      });

      var self = this;
      this.App.socket.on('request-sent:meet', function() {
        alert( 'you are invited to a new meet' );
        self.updateMeets();
      });

      this.collection.on( 'add', this.renderMeets, this );
      this.collection.on( 'remove', this.renderMeets, this );
    }
  , render: function() {
      var self = this;
      self.delegateEvents();

      self.$el.append( self.views.header.el );
      self.$el.append( self.views.meetingsAttending.el );

      self.views.header.render();

      self.collection.fetch({
        error: function( collection, res, options ) {
          console.dir( res );
        }
      , success: function( collection, res, options ) {
          console.log( 'Successfully fetched meets.' );
          self.views.meetingsAttending.render();
        }
      });

      return self;
    }
  , updateMeets: function() {
      this.collection.fetch({
        error: function( collection, res, options ) {
          console.dir( res );
        }
      , success: function( collection, res, options ) {
          console.log( 'Successfully fetched updated meets.' );
        }
      });
    }
  , renderMeets: function() {
      this.views.meetingsAttending.render();
    }
  });

  return MeetsView;
});
