define([
  'text!js/templates/header/headerFriend.html'
, 'js/models/viewFilter'
], function( headerFriendTemplate, ViewFilterModel ) {
  var HeaderFriends = Backbone.View.extend({
    tagName: 'header'
  , className: 'action-bar grid header--friends'
  , template: _.template( headerFriendTemplate )
  , events: {
      'click .view-filter .selector__label': 'renderFilterList'
    , 'click .view-filter .selector__options--item': 'updateActiveFilter'
    }
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;
      self.model = new ViewFilterModel({
        filters: [
          { name: 'Friends', path: '/friends' }
        , { name: 'Requests', path: '#' }
        , { name: 'Find Friend', path: '/friends/find' }
        ]
      });

      self.model.on( 'change', self.applyFilter, self );

      $( document ).ready(function() {
        $( 'body' ).on('click', function() {
          self.hideOpenSelectors();
        });
      });
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template( this.model.toJSON() ) );

      return this;
    }
  , hideOpenSelectors: function() {
      this.$el.find( '.selector__options:visible' ).hide();
    }
  , renderFilterList: function( evt ) {
      evt.stopPropagation();
      this.hideOpenSelectors();
      this.$el.find( '.view-filter .selector__options' ).show();
    }
  , updateActiveFilter: function( evt ) {
      evt.preventDefault();
      this.model.set( 'activeFilter', $( evt.currentTarget ).data( 'index' ) );
    }
  , applyFilter: function() {
      var activeIndex = this.model.get( 'activeFilter' )
        , newFilterPath = this.model.get( 'filters' )[ activeIndex ].path;

      this.render();
      this.App.router.navigate( newFilterPath, { trigger: true } );
    }
  });

  return HeaderFriends;
});
