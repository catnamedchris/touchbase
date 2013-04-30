define([
  'text!templates/auth/login.html'
, 'models/auth/login'
], function( template, LoginModel ) {
  var LoginView = Backbone.View.extend({
    tagName: 'div'
  , className: 'account-login'
  , template: _.template( template )
  , events: {
      'click .toggle-signup': 'toggleForm'
    , 'submit': 'submitForm'
    }
  , initialize: function( options ) {
      this.parent = options.parent;
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
  , toggleForm: function( evt ) {
      evt.preventDefault();
      this.parent.Pubsub.trigger( 'toggleForm', this );
    }
  , submitForm: function( evt ) {
      evt.preventDefault();
      this.model.set({
        email: this.$el.find( 'input[type=email]' ).val()
      , password: this.$el.find( 'input[name=password]' ).val()
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

          self.remove();
          self.parent.Pubsub.trigger( 'loggedIn' );
        }
      });
    }
  });

  return LoginView;
});
