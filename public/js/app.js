define([ 'views/account' ], function( AccountView ) {
  var App = function() {
    this.Views = {};
    this.Views.accountView = new AccountView();
  };
  return App;
});
