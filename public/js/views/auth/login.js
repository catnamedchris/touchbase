define([ 'js/models/auth/login' ], function( LoginModel ) {
  var LoginView = Backbone.View.extend({
    el: '.login'
  , events: {
      'submit': 'submitForm'
    , 'click .toggle-signup': 'toggleView'
    }
  , initialize: function( options ) {
      var self = this;

      this.Pubsub = options.Pubsub;
      this.model = new LoginModel();
      this.model.on('invalid', function( model, errors ) {
        console.log( errors );
        self.$el.find( '.errors' ).empty();
        self.$el.find( 'input' ).removeClass( 'error' );
        for ( var err in errors.fields ) {
          if ( errors.fields[ err ]  !== '' ) {
            if ( (errors.fields[ err ] instanceof Array) && errors.fields[ err ].length ) {
              self.$el.find( '#' + err ).addClass( 'error' );
              _.each( errors.fields[ err ], function( msg ) {
                self.$el.find( '.errors' ).append( '<p class="error-msg">' + msg + '</p>' );
              });
            } else if ( !(errors.fields[ err ] instanceof Array) ){
              self.$el.find( '#' + err ).addClass( 'error' );
              self.$el.find( '.errors' ).append( '<p class="error-msg">' + errors.fields[ err ] + '</p>' );
            }
          }
        }
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
        username: this.$el.find( '#username' ).val()
      , password: this.$el.find( '#password' ).val()
      });

      var self = this;
      var attrs = this.model.attributes;
      this.model.save(attrs, {
        error: function( model, res, options ) {
          console.log( 'Login failed.' );
          console.dir( res );
          model.trigger( 'invalid', model, res.responseJSON );
        }
      , success: function( model, res, options ) {
          console.log( 'Login successful.' );
          self.$el.find( 'input' ).removeClass( 'error' );
          console.dir( res );
          window.location = '/';
        }
      });
    }
  });

  return LoginView;
});
