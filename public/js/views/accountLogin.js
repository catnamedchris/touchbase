define([ 'text!templates/account-login.html' ], function( template ) {
  var AccountLoginView = Backbone.View.extend({
    tagName: 'div'
  , className: 'account-login'
  , template: _.template( template )
  , events: {
      'click .toggle-signup': 'toggleForm'
    }
  , initialize: function( options ) {
      this.parent = options.parent;
    }
  , render: function() {
      this.$el.html( this.template() );
      this.delegateEvents();
      return this;
    }
  , toggleForm: function( evt ) {
      evt.preventDefault();
      this.parent.trigger('toggleForm', this);
    }
  });

  return AccountLoginView;
});
