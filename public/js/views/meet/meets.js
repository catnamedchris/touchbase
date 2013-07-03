define([
  'js/collections/meets'
, 'js/views/header/header'
, 'js/views/meet/meetCards'
], function( MeetCollection, HeaderView, MeetCardsView ) {
  var MeetsView = Backbone.View.extend({
    className: 'meets'
  , initialize: function( options ) {
      this.App = options.App;

      this.collection = new MeetCollection();

      this.views = {};
      this.views.header = new HeaderView({ App: this.App });
      this.views.meetCards = new MeetCardsView({
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
      self.$el.append( self.views.meetCards.el );

      self.views.header.render();

      self.updateMeets();

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
      this.views.meetCards.render();
    }
  });

  return MeetsView;
});
