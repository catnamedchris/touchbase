define([], function() {
  var SignupModel = Backbone.Model.extend({
    url: '/signup'
  , defaults: {
      fName: ''
    , lName: ''
    , email: ''
    , password: ''
    }
  , validate: function( attrs, options ) {
      var name = /^\S+.*$/
        , email = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
        , password = /^(\w+.*\d+.*[^\w\s]+|\w+.*[^\w\s]+.*\d+|\d+.*\w+.*[^\w\s]+|\d+.*[^\w\s]+.*\w+|[^\w\s]+.*\d+.*\w+|[^\w\s]+.*\w+.*\d+)$/;

      var Errors = function() {
        this.fields = {
          fName: ''
        , lName: ''
        , email: ''
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

      if ( !name.test(attrs.fName) ) {
        errors.push( 'fName', 'First name cannot be empty.' );
      }
      if ( !name.test(attrs.lName) ) {
        errors.push( 'lName', 'Last name cannot be empty.' );
      }
      if ( !email.test(attrs.email) ) {
        errors.push( 'email', 'Email is invalid.' );
      }
      if ( !password.test(attrs.password) ) {
        errors.push( 'password', 'Password must contain at least one of the following: an alphabetic character, a digit, and a symbol.' );
      }
      if ( attrs.password.length < 6) {
        errors.push( 'password', 'Password must contain at least 6 characters.');
      }

      if ( errors.numErrors ) { return errors; }
    }
  });

  return SignupModel;
});
