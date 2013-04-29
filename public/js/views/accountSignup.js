define([ 'text!templates/account-signup.html' ], function( template ) {
  var AccountSignupView = Backbone.View.extend({
    tagName: 'div'
  , className: 'account-signup'
  , template: _.template( template )
  , events: {
      'click .toggle-login': 'toggleForm'
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

  return AccountSignupView;
});
