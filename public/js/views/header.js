define([
  'text!js/templates/header.html'
, 'js/models/meetFilter'
], function( headerTemplate, MeetFilterModel ) {
  var HeaderView = Backbone.View.extend({
    tagName: 'header'
  , className: 'action-bar grid'
  , template: _.template( headerTemplate )
  , events: {
      'click .selector__label': 'renderPseudoFilters'
    , 'click .selector__options--pseudo-filter': 'updateActiveFilter'
    }
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;
      self.meetFilterModel = new MeetFilterModel();

      self.meetFilterModel.on( 'change', self.applyFilter, self );

      $( document ).ready(function() {
        $( 'body' ).on('click', function() {
          var $pseudoFilter = self.$el.find( '.selector__options' );
          if ( $pseudoFilter.filter( ':visible' ).length ) {
            $pseudoFilter.hide();
          }
        });
      });
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template() );

      return this;
    }
  , renderPseudoFilters: function( evt ) {
      evt.stopPropagation();
      this.$el.find( '.selector__options' ).show();
    }
  , updateActiveFilter: function( evt ) {
      this.meetFilterModel.set( 'activeFilter', $( evt.target ).data( 'index' ) );
    }
  , applyFilter: function() {
      var activeIndex = this.meetFilterModel.get( 'activeFilter' );

      this.$el
        .find( '.selector__label h2' )
        .html( this.meetFilterModel.get( 'filters' )[ activeIndex ] );

      var $filters = this.$el.find( '.meet-filter__dropdown option' );
      $( $filters[ activeIndex ] )
        .prop( 'selected', true )
        .siblings()
        .prop( 'selected', false);

      var $pseudoFilter = this.$el.find( '.selector__options' )
        , $pseudoFilterItems = $pseudoFilter.find( '.selector__options--pseudo-filter' );
      $( $pseudoFilterItems[ activeIndex ] )
        .addClass( 'selected' )
        .siblings()
        .removeClass( 'selected' );

      $pseudoFilter.hide();

      // Change meet cards
    }
  });

  return HeaderView;
});
