define([
  'views/accountLogin'
, 'views/accountSignup'
], function( AccountLoginView, AccountSignupView ) {
  var AccountView = Backbone.View.extend({
    el: '.account'
  , initialize: function() {
      this.accountLoginView = new AccountLoginView({ parent: this });
      this.accountSignupView = new AccountSignupView({ parent: this });

      this.on('toggleForm', this.render);

      this.render( this.accountSignupView );
    }
  , render: function( inactiveForm ) {
      if ( inactiveForm === this.accountLoginView ) {
        this.accountLoginView.remove();
        this.$el.append( this.accountSignupView.$el );
        this.accountSignupView.render();
      } else {
        this.accountSignupView.remove();
        this.$el.append( this.accountLoginView.$el );
        this.accountLoginView.render();
      }
    }
  });

  return AccountView;
});
