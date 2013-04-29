define([ 'text!templates/account-signup.html' ], function( template ) {
  var AccountSignupView = Backbone.View.extend({
    el: '.account-signup'
  , template: _.template( template )
  , initialize: function() { this.render(); }
  , render: function() {
      this.$el.html( this.template() );
      return this;
    }
  });

  return AccountSignupView;
});
