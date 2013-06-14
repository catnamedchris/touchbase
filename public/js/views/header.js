define([
  'text!js/templates/header.html'
, 'js/models/meetFilter'
], function( headerTemplate, MeetFilterModel ) {
  var HeaderView = Backbone.View.extend({
    tagName: 'header'
  , className: 'action-bar grid'
  , template: _.template( headerTemplate )
  , events: {
      'click .meet-filter .selector__label': 'renderPseudoFilters'
    , 'click .meet-filter .selector__options--item': 'updateActiveFilter'
    , 'click .add-meet': 'renderAddMeet'
    , 'click .menu': 'renderMenu'
    , 'click .menu--selector__options .selector__options--item a': 'navigateToLink'
    }
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;
      self.meetFilterModel = new MeetFilterModel();

      self.meetFilterModel.on( 'change', self.applyFilter, self );

      $( document ).ready(function() {
        $( 'body' ).on('click', function() {
          var $selectorOptions = self.$el.find( '.selector__options' );
          if ( $selectorOptions.filter( ':visible' ).length ) {
            $selectorOptions.hide();
          }
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
  , renderPseudoFilters: function( evt ) {
      evt.stopPropagation();
      this.hideOpenSelectors();
      this.$el.find( '.meet-filter .selector__options' ).show();
    }
  , updateActiveFilter: function( evt ) {
      this.meetFilterModel.set( 'activeFilter', $( evt.target ).data( 'index' ) );
    }
  , applyFilter: function() {
      var activeIndex = this.meetFilterModel.get( 'activeFilter' );

      this.$el
        .find( '.meet-filter .selector__label h2' )
        .html( this.meetFilterModel.get( 'filters' )[ activeIndex ] );

      var $filters = this.$el.find( '.meet-filter__dropdown option' );
      $( $filters[ activeIndex ] )
        .prop( 'selected', true )
        .siblings()
        .prop( 'selected', false);

      var $pseudoFilter = this.$el.find( '.meet-filter .selector__options' )
        , $pseudoFilterItems = $pseudoFilter.find( '.selector__options--item' );
      $( $pseudoFilterItems[ activeIndex ] )
        .addClass( 'selected' )
        .siblings()
        .removeClass( 'selected' );

      $pseudoFilter.hide();

      // TODO: Change meet cards
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

      // TODO: Navigate to selected view
      console.log( 'navigate to ' + $( evt.target ).attr( 'href' ) );
      var href = $( evt.target ).attr( 'href' );
      this.App.router.navigate( href, { trigger: true } );
    }
  });

  return HeaderView;
});
