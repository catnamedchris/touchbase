define([
  'views/auth/login'
, 'views/auth/signup'
], function( LoginView, SignupView ) {
  var AuthView = Backbone.View.extend({
    el: '.auth'
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.Pubsub.on( 'toggleForm', this.render, this );
      this.Pubsub.on( 'loggedIn', this.remove, this );

      this.loginView = new LoginView({ parent: this });

      this.render();
    }
  , render: function( activeForm ) {
      if ( activeForm === this.loginView ) {
        this.loginView.remove();
        this.signupView = this.signupView || new SignupView({ parent: this });
        this.$el.append( this.signupView.$el );
        this.signupView.render();
      } else {
        if ( this.signupView ) { this.signupView.remove(); }
        this.$el.append( this.loginView.$el );
        this.loginView.render();
      }
    }
  });

  return AuthView;
});
