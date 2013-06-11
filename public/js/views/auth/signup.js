define([ 'js/models/user/user' ], function( UserModel ) {
  var SignupView = Backbone.View.extend({
    el: '.signup'
  , events: {
      'submit': 'submitForm'
    , 'click .toggle-login': 'toggleView'
    }
  , initialize: function( options ) {
      var self = this;

      this.Pubsub = options.Pubsub;
      this.model = new UserModel();
      this.model.on('invalid', function( model, errors ) {
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
        self.$el.find( '.errors' ).slideDown( 1000 );
      });
    }
  , render: function() {
      this.$el.show();
      return this;
    }
  , hide: function() {
      this.$el.hide();
      return this;
    }
  , toggleView: function() {
      this.Pubsub.trigger( 'toggleLogin' );
      return this;
    }
  , submitForm: function( evt ) {
      evt.preventDefault();
      this.$el.find( '.errors' ).empty();
      this.model.set({
        email: this.$el.find( '#email' ).val()
      , username: this.$el.find( '#username' ).val()
      , password: this.$el.find( '#password' ).val()
      });

      var self = this;
      var attrs = this.model.attributes;
      this.model.save(attrs, {
        validateSignup: true
      , error: function( model, res, options ) {
          console.log( 'Signup failed.' );
          console.dir( res );
          model.trigger( 'invalid', model, res.responseJSON );
        }
      , success: function( model, res, options ) {
          console.log( 'Signup successful.' );
          self.$el.find( 'input' ).removeClass( 'error' );
          console.dir( res );
          window.location = '/';
        }
      });
    }
  });

  return SignupView;
});
