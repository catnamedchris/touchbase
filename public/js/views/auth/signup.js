define([
  'text!templates/auth/signup.html'
, 'models/auth/signup'
], function( template, SignupModel ) {
  var SignupView = Backbone.View.extend({
    tagName: 'div'
  , className: 'account-signup'
  , template: _.template( template )
  , events: {
      'click .toggle-login': 'toggleForm'
    , 'submit': 'submitForm'
    }
  , initialize: function( options ) {
      this.parent = options.parent;
      this.model = new SignupModel();
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
      this.parent.Pubsub.trigger('toggleForm', this);
    }
  , submitForm: function( evt ) {
      evt.preventDefault();
      this.model.set({
        fName: this.$el.find( '#fName' ).val()
      , lName: this.$el.find( '#lName' ).val()
      , email: this.$el.find( '#email' ).val()
      , password: this.$el.find( '#password' ).val()
      });

      var self = this;
      var attrs = this.model.attributes;
      this.model.save(attrs, {
        error: function( model, res, options ) {
          console.log( 'Signup failed.' );
          console.log( res.responseText );
        }
      , success: function( model, res, options ) {
          console.log( 'Signup successful.' );
          console.dir( res );

          self.remove();
          self.parent.Pubsub.trigger( 'loggedIn' );
        }
      });

    }
  });

  return SignupView;
});
