define([], function() {
  var LoginModel = Backbone.Model.extend({
    url: '/login'
  , defaults: {
      username: ''
    , password: ''
    }
  , validate: function( attrs, options ) {
      var self = this;
      var username = /^\S+.*$/
        , password = /^(\w+.*\d+.*[^\w\s]+|\w+.*[^\w\s]+.*\d+|\d+.*\w+.*[^\w\s]+|\d+.*[^\w\s]+.*\w+|[^\w\s]+.*\d+.*\w+|[^\w\s]+.*\w+.*\d+)$/;

      var Errors = function() {
        this.fields = {
          username: ''
        , password: []
        };
        this.numErrors = 0;
      };

      Errors.prototype.push = function( errName, errMsg ) {
        if ( this.fields[errName] instanceof Array ) {
          this.fields[errName].push( errMsg );
        } else {
          this.fields[errName] = errMsg;
        }
        this.numErrors++;
      };
      var errors = new Errors();

      if ( !username.test(attrs.username)){
        errors.push( 'username', 'Username is invalid.' );
      }
      if ( !password.test(attrs.password) ) {
        errors.push( 'password', 'Password must contain at least one of the following: a letter, a digit, and a symbol.' );
      }
      if ( attrs.password.length < 6) {
        errors.push( 'password', 'Password must contain at least 6 characters.');
      }

      if ( errors.numErrors ) { return errors; }
    }
  });

  return LoginModel;
});
