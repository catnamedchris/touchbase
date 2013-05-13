define([ 'js/models/auth/login' ], function( LoginModel ) {
  var LoginView = Backbone.View.extend({
    el: '.login'
  , events: {
      'submit': 'submitForm'
    , 'click .toggle-signup': 'toggleView'
    }
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.model = new LoginModel();
      this.model.on('invalid', function( model, err ) {
        console.log( err );
      });
    }
  , render: function() {
      this.$el.show();
      return this;
    }
  , hide: function() {
      this.$el.hide();
    }
  , toggleView: function() {
      this.Pubsub.trigger( 'toggleSignup' );
      return this;
    }
  , submitForm: function( evt ) {
      evt.preventDefault();
      this.model.set({
        email: this.$el.find( '#email' ).val()
      , password: this.$el.find( '#password' ).val()
      });

      var self = this;
      var attrs = this.model.attributes;
      this.model.save(attrs, {
        error: function( model, res, options ) {
          console.log( 'Login failed.' );
          console.log( res.responseText );
        }
      , success: function( model, res, options ) {
          console.log( 'Login successful.' );
          console.log( res );
        }
      });
    }
  });

  return LoginView;
});
