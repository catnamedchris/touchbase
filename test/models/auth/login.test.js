describe('Model :: Login', function() {
  var loginModel;

  beforeEach(function( done ) {
    require([ 'js/models/auth/login' ], function( LoginModel ){
      loginModel = new LoginModel();
      done();
    });
  });

  describe('initialize()', function() {
    it('should exist', function() {
      loginModel.should.exist;
    });

    it('should have the correct URL attribute', function() {
      loginModel.url.should.equal('/login');
    });

    it('should have an empty string username by default', function() {
      loginModel.attributes.username.should.equal('');
    });

    it('should have an empty string password by default', function() {
      loginModel.attributes.password.should.equal('');
    });
  });

  describe('validate()', function() {
    it('should invalidate when attempting to set an empty username', function() {
      var options = { username: '' , password: 'password1!' };
      loginModel.set( options );
      loginModel.isValid().should.be.false;
    });

    it('should invalidate when attempting to set an empty password', function() {
      var options = { username: 'username' , password: '' };
      loginModel.set( options );
      loginModel.isValid().should.be.false;
    });

    it('should invalidate when setting a password without a character in the set [_a-zA-Z0-9]', function() {
      var options = { username: 'username' , password: '**!!@@' };
      loginModel.set( options );
      loginModel.isValid().should.be.false;
    });

    it('should invalidate when setting a password without a character in the set [0-9]', function() {
      var options = { username: 'username' , password: 'aa!!@@' };
      loginModel.set( options );
      loginModel.isValid().should.be.false;
    });

    it('should invalidate when setting a password without a character in the set [^\\w\\s]', function() {
      var options = { username: 'username' , password: 'aa1111' };
      loginModel.set( options );
      loginModel.isValid().should.be.false;
    });

    it('should validate when setting a valid username and password', function() {
      var options = { username: 'username' , password: 'password1!' };
      loginModel.set( options );
      loginModel.isValid().should.be.true;

    });
  });
});
