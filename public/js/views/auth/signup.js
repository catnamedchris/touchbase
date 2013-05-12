define([
  'text!templates/auth/signup.html'
, 'models/auth/signup'
], function( template, SignupModel ) {
  var SignupView = Backbone.View.extend({
    tagName: 'div'
  , className: 'signup'
  , template: _.template( template )
  , events: {
      'submit': 'submitForm'
    , 'keypress .text-input': 'validateInput'
    }
  , initialize: function( options ) {
      var self = this;

      this.Pubsub = options.Pubsub;
      this.model = new SignupModel();
      this.model.on('invalid', function( model, errors ) {
        console.dir(model.attributes);
        for ( err in errors.fields ) {
          if ( errors.fields[ err ]  !== '' ) {
            self.$el.find( '#' + err ).addClass( 'error' );
            self.$el.find( '.form-fields' ).append( '<p>' + errors.fields[ err ] + '</p>');
          }
          if ( (errors.fields[ err ] instanceof Array) && errors.fields[ err ].length ) {
            self.$el.find( '#' + err ).addClass( 'error' );
            self.$el.find( '.form-fields' ).append( '<p>' + errors.fields[ err ] + '</p>');
          }
        }
      });
    }
  , render: function() {
      this.$el.html( this.template() );
      this.delegateEvents();
      return this;
    }
  , validateInput: function( evt ) {
      var attrs = {}
        , id = '#' + evt.currentTarget.id
        , $field = this.$el.find( id )
        , value = $field.val();

      attrs[ $field.attr('name') ] = value;

      this.model.set( attrs, { validate: true } );
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

          self.Pubsub.trigger( 'loggedIn' );
        }
      });
    }
  });

  return SignupView;
});
