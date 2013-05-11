describe('View :: Login', function() {
  var loginView, LoginModel;

  before(function( done ) {
    require([ 'models/auth/login' ], function( _LoginModel ) {
      LoginModel = _LoginModel;
    });
    done();
  });

  beforeEach(function( done ) {
    require([ 'views/auth/login' ], function( LoginView ) {
      var Pubsub = _.extend( {}, Backbone.Events );
      loginView = new LoginView({ Pubsub: Pubsub });
      done();
    });
  });

  describe('initialize()', function() {
    it('should have a Pubsub property', function() {
      loginView.should.have.property( 'Pubsub' );
    });

    it('should have a LoginModel', function() {
      loginView.model.should.be.an.instanceof( LoginModel );
    });

    it('should render an error notification when its model is invalid');
  });

  describe('render()', function() {
    it('should render the TouchBase title', function() {
      loginView.render();
      loginView.$el.html().should.match(/TouchBase/);
    });

    it('should render the email field', function() {
      loginView.render();
      loginView.$el.find( '#email' ).should.not.have.length( 0 );
    });

    it('should render the password field', function() {
      loginView.render();
      loginView.$el.find( '#password' ).should.not.have.length( 0 );
    });

    it('should render the login button', function() {
      loginView.render();
      loginView.$el.find( 'input[type=submit]' ).should.not.have.length( 0 );
    });

    it('should render the toggle signup button', function() {
      loginView.render();
      loginView.$el.find( '.toggle-signup' ).should.not.have.length( 0 );
    });
  });

  describe('submitForm()', function() {
    it('should respond to the "submit" event', function() {
      var spy = sinon.spy( loginView, 'submitForm' );
      var $loginForm = loginView.render().$el.find( 'form' );
      $loginForm.submit();
      spy.should.have.been.called;
    });

    it('should submit the form (trigger the loggedIn event) form data is valid');

    it('should not submit the form with an invalid email');
    it('should not submit the form with an invalid password');
    it('should show an error notification when attempting to submit an invalid email');
    it('should show an error notification when attempting to submit an invalid password');
  });
});
