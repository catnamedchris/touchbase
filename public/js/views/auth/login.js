define([
  'text!templates/auth/login.html'
, 'models/auth/login'
], function( template, LoginModel ) {
  var LoginView = Backbone.View.extend({
    tagName: 'div'
  , className: 'login'
  , template: _.template( template )
  , events: {
      'submit': 'submitForm'
    }
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.model = new LoginModel();
      this.model.on('invalid', function( model, err ) {
        console.log( err );
      });
    }
  , render: function() {
      this.$el.html( this.template() );
      this.delegateEvents();
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

          self.Pubsub.trigger( 'loggedIn' );
        }
      });
    }
  });

  return LoginView;
});
