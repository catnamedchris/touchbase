define([
  'text!js/templates/tabSwitcher.html'
, 'js/models/viewFilter'
], function( tabSwitcherTemplate, ViewFilterModel ) {
  var TabSwitcher = Backbone.View.extend({
    tagName: 'header'
  , className: 'tab-switcher'
  , template: _.template( tabSwitcherTemplate )
  , initialize: function( options ) {
      var self = this;
      self.App = options.App;
      self.model = new ViewFilterModel({
        filters: [
          'What'
        , 'When'
        , 'Where'
        , 'Who'
        ]
      });
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template() );
    }
  });

  return TabSwitcher;
});
