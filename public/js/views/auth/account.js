define([
  'views/auth/login'
, 'views/auth/signup'
], function( LoginView, SignupView, LoginModel ) {
  var AccountView = Backbone.View.extend({
    el: '.account'
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;

      this.loginView = new LoginView({ parent: this });
      this.signupView = new SignupView({ parent: this });

      this.Pubsub.on( 'toggleForm', this.render, this );
      this.Pubsub.on( 'loggedIn', this.remove, this );

      this.render( this.signupView );
    }
  , render: function( inactiveForm ) {
      if ( inactiveForm === this.loginView ) {
        this.loginView.remove();
        this.$el.append( this.signupView.$el );
        this.signupView.render();
      } else {
        this.signupView.remove();
        this.$el.append( this.loginView.$el );
        this.loginView.render();
      }
    }
  });

  return AccountView;
});
