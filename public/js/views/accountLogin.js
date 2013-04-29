define([ 'text!templates/account-login.html' ], function( template ) {
  var AccountLoginView = Backbone.View.extend({
    el: '.account-login'
  , template: _.template( template )
  , initialize: function() { this.render(); }
  , render: function() {
      this.$el.html( this.template() );
      return this;
    }
  });

  return AccountLoginView;
});
