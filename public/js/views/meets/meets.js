define([
  'js/collections/meets'
, 'js/views/header'
, 'js/views/meets/meetCard'
], function( MeetCollection, HeaderView, MeetCardView  ) {
  var MeetsView = Backbone.View.extend({
    className: 'meets'
  , initialize: function( options ) {
      this.App = options.App;
      this.headerView = new HeaderView({ App: this.App });
      this.collection = new MeetCollection();
    }
  , render: function() {
      var self = this;
      this.$el.append( this.headerView.el );
      this.headerView.render();

      this.collection.fetch({
        error: function( collection, res, options ) {
          console.dir( res );
        }
      , success: function( collection, res, options ) {
          console.log( 'Successfully fetched meets.' );
          collection.each(function( meet ) {
            var meetCardView = new MeetCardView({
              model: meet
            , App: self.App
            });
            self.$el.append( meetCardView.render().el );
          });
        }
      });

      return this;
    }
  });

  return MeetsView;
});
