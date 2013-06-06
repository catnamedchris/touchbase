define([], function() {
  var Validator = function() {
    var re = {
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    , username: /^\S+.*$/
    , password: /^(\w+.*\d+.*[^\w\s]+|\w+.*[^\w\s]+.*\d+|\d+.*\w+.*[^\w\s]+|\d+.*[^\w\s]+.*\w+|[^\w\s]+.*\d+.*\w+|[^\w\s]+.*\w+.*\d+)$/
    };

    var MIN_PASS_LENGTH = 6;

    return {
      errors: {
        fields: {
          email: ''
        , username: ''
        , password: []
        }
      , numErrors: 0
      , push: function( errName, errMsg ) {
          if ( this.fields[errName] instanceof Array ) {
            this.fields[errName].push( errMsg );
          } else {
            this.fields[errName] = errMsg;
          }
          this.numErrors++;
        }
      }
    , hasErrors: function() {
        return !!this.errors.numErrors;
      }
    , checkEmail: function( input ) {
        if ( !re.email.test( input ) ) {
          this.errors.push( 'email', 'Email is invalid.' );
        }
      }
    , checkUsername: function( input ) {
        if ( !re.username.test( input ) ){
          this.errors.push( 'username', 'Username is invalid.' );
        }
      }
    , checkPassword: function( input ) {
        if ( !re.password.test( input ) ) {
          this.errors.push( 'password', 'Password must contain at least one of the following: a letter, a digit, and a symbol.' );
        }
        if ( input.length < MIN_PASS_LENGTH) {
          this.errors.push( 'password', 'Password must contain at least 6 characters.');
        }
      }
    };
  };

  return Validator;
});
