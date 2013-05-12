describe('View :: Signup', function() {
  var signupView, SignupModel;

  before(function( done ) {
    require([ 'models/auth/signup' ], function( _SignupModel ) {
      SignupModel = _SignupModel;
    });
    done();
  });

  beforeEach(function( done ) {
    require([ 'views/auth/signup' ], function( SignupView ) {
      var Pubsub = _.extend( {}, Backbone.Events );
      signupView = new SignupView({ Pubsub: Pubsub });
      done();
    });
  });

  describe('initialize()', function() {
    it('should have a Pubsub property', function() {
      signupView.should.have.property( 'Pubsub' );
    });

    it('should have a SignupModel', function() {
      signupView.model.should.be.an.instanceof( SignupModel );
    });

    it('should render an error notification when its model is invalid');
  });

  describe('render()', function() {
    it('should render the first name field', function() {
      signupView.render();
      signupView.$el.find( '#fName' ).should.not.have.length( 0 );
    });

    it('should render the last name field', function() {
      signupView.render();
      signupView.$el.find( '#lName' ).should.not.have.length( 0 );
    });

    it('should render the email field', function() {
      signupView.render();
      signupView.$el.find( '#email' ).should.not.have.length( 0 );
    });

    it('should render the password field', function() {
      signupView.render();
      signupView.$el.find( '#password' ).should.not.have.length( 0 );
    });

    it('should render the signup button', function() {
      signupView.render();
      signupView.$el.find( 'input[type=submit]' ).should.not.have.length( 0 );
    });

    it('should render the toggle login button', function() {
      signupView.render();
      signupView.$el.find( '.toggle-login' ).should.not.have.length( 0 );
    });
  });

  describe('submitForm()', function() {
    var spy, $signupForm;

    beforeEach(function() {
      spy = sinon.spy( signupView, 'submitForm' );
      $signupForm = signupView.render().$el.find( 'form' );
      $signupForm.find( '#fName' ).val( 'a' );
      $signupForm.find( '#lName' ).val( 'a' );
      $signupForm.find( '#email' ).val( 'a@mailinator.com' );
      $signupForm.find( '#password' ).val( 'password1!' );
    });

    it('should respond to the "submit" event', function() {
      $signupForm.submit();
      spy.should.have.been.called;
    });

    it('should submit the form (trigger the loggedIn event) form data is valid', function() {
      spy = sinon.spy();
      signupView.Pubsub.on( 'loggedIn', spy, this );

      var server = sinon.fakeServer.create();
      server.respondWith(
        'POST'
      , '/signup'
      , [200, { 'Content-Type': 'application/json' }, '[{}]']
      );

      $signupForm.submit();
      server.respond();

      spy.should.have.been.called;
    });

    it('should not submit the form (trigger the loggedIn event) with an invalid first name', function() {
      spy = sinon.spy();
      signupView.Pubsub.on( 'loggedIn', spy, this );

      $signupForm.find( '#fName' ).val( '' );
      $signupForm.submit();

      spy.should.not.have.been.called;
    });

    it('should not submit the form (trigger the loggedIn event) with an invalid last name', function() {
      spy = sinon.spy();
      signupView.Pubsub.on( 'loggedIn', spy, this );

      $signupForm.find( '#lName' ).val( '' );
      $signupForm.submit();

      spy.should.not.have.been.called;
    });

    it('should not submit the form (trigger the loggedIn event) with an invalid email', function() {
      spy = sinon.spy();
      signupView.Pubsub.on( 'loggedIn', spy, this );

      $signupForm.find( '#email' ).val( '' );
      $signupForm.submit();

      spy.should.not.have.been.called;
    });

    it('should not submit the form (trigger the loggedIn event) with an invalid password', function() {
      spy = sinon.spy();
      signupView.Pubsub.on( 'loggedIn', spy, this );

      $signupForm.find( '#password' ).val( '' );
      $signupForm.submit();

      spy.should.not.have.been.called;
    });

    it('should show an error notification when attempting to submit an invalid first name');

    it('should show an error notification when attempting to submit an invalid last name');
    it('should show an error notification when attempting to submit an invalid email');
    it('should show an error notification when attempting to submit an invalid password');
  });
});
