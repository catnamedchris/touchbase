define([
  'views/auth/login'
, 'views/auth/signup'
], function( LoginView, SignupView ) {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'login'
    , 'login': 'login'
    , 'signup': 'signup'
    }
  , initialize: function( options ) {
      this.appViews = options.appViews;
      this.rootView = this.appViews.rootView;

      this.Pubsub = options.Pubsub;
    }
  , login: function() {
      this.appViews.loginView = this.appViews.loginView || new LoginView({ Pubsub: this.Pubsub });
      this.rootView.render( this.appViews.loginView );
    }
  , signup: function() {
      this.appViews.signupView = this.appViews.signupView || new SignupView({ Pubsub: this.Pubsub });
      this.rootView.render( this.appViews.signupView );
    }
  });

  return Router;
});
