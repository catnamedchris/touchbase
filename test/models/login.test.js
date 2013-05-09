describe('Model :: Login', function() {
  var loginModel;

  beforeEach(function( done ) {
    require([ 'models/auth/login' ], function( LoginModel ){
      loginModel = new LoginModel();
      done();
    });
  });

  describe('Creation', function() {
    it('should exist', function() {
      loginModel.should.exist;
    });

    it('should have the correct URL attribute', function() {
      loginModel.url.should.equal('/login');
    });

    it('should have an empty string email by default', function() {
      loginModel.attributes.email.should.equal('');
    });

    it('should have an empty string password by default', function() {
      loginModel.attributes.password.should.equal('');
    });
  });

  describe('Validation', function() {
    it('should invalidate when attempting to set an empty email', function() {
      loginModel.set('email', '');
      loginModel.set('password', 'password');
      loginModel.isValid().should.be.false;
    });

    it('should invalidate when attempting to set an empty password', function() {
      loginModel.set('email', 'email');
      loginModel.set('password', '');
      loginModel.isValid().should.be.false;
    });

    it('should validate when setting both a non-empty email and password', function() {
      loginModel.set('email', 'email');
      loginModel.set('password', 'password');
      loginModel.isValid().should.be.true;
    });
  });
});
