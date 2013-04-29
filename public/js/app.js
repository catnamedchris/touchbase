define([
  'views/accountLogin'
, 'views/accountSignup'
], function( AccountLoginView, AccountSignupView ) {
  var App = function() {
    var accountLoginView = new AccountLoginView()
      , accountSignupView = new AccountSignupView();
  };
  return App;
});
