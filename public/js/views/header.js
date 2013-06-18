define([
  'text!js/templates/header.html'
, 'js/models/viewFilter'
], function( headerTemplate, ViewFilterModel ) {
  var HeaderView = Backbone.View.extend({
    tagName: 'header'
  , className: 'action-bar grid'
  , template: _.template( headerTemplate )
  , events: {
      'click .view-filter .selector__label': 'renderFilterList'
    , 'click .view-filter .selector__options--item': 'updateActiveFilter'
    , 'click .add-meet': 'renderAddMeet'
    , 'click .menu': 'renderMenu'
    , 'click .menu--selector__options .selector__options--item a': 'navigateToLink'
    }
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;
      self.model = new ViewFilterModel({
        filters: [ 'Attending', 'Invited', 'Cancelled' ]
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
      this.$el.html( this.template() );

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
      this.model.set( 'activeFilter', $( evt.target ).data( 'index' ) );
    }
  , applyFilter: function() {
      var activeIndex = this.model.get( 'activeFilter' )
        , newFilter = this.model.get( 'filters' )[ activeIndex ];

      this.$el
        .find( '.view-filter .selector__label h2' )
        .html( newFilter );

      var $filterList = this.$el.find( '.view-filter .selector__options' )
        , $filterListItems = $filterList.find( '.selector__options--item' );
      $( $filterListItems[ activeIndex ] )
        .addClass( 'selected' )
        .siblings()
        .removeClass( 'selected' );

      $filterList.hide();

      this.App.Pubsub.trigger( 'filter:meets', newFilter );
    }
  , renderAddMeet: function() {
      console.log( 'Render add-meet view' );
    }
  , renderMenu: function( evt ) {
      evt.stopPropagation();
      this.$el.find( '.selector__options:visible' ).hide();
      this.$el.find( '.menu--selector__options' ).show();
    }
  , navigateToLink: function( evt ) {
      evt.preventDefault();
      evt.stopPropagation();

      this.$el.find( '.menu--selector__options' ).hide();

      var href = $( evt.target ).attr( 'href' );
      this.App.router.navigate( href, { trigger: true } );
    }
  });

  return HeaderView;
});
