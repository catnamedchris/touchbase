describe('Model :: Signup', function() {
  var signupModel;

  beforeEach(function( done ) {
    require([ 'js/models/auth/signup' ], function( SignupModel ){
      signupModel = new SignupModel();
      done();
    });
  });

  describe('initialize()', function() {
    it('should exist', function() {
      signupModel.should.exist;
    });

    it('should have the correct URL attribute', function() {
      signupModel.url.should.equal('/user');
    });

    it('should have an empty string email by default', function() {
      signupModel.attributes.email.should.equal('');
    });

    it('should have an empty string username by default', function() {
      signupModel.attributes.username.should.equal('');
    });

    it('should have an empty string password by default', function() {
      signupModel.attributes.password.should.equal('');
    });
  });

  describe('validate()', function() {
    var options = {};

    beforeEach(function() {
      options = {
        email: 'a@mailinator.com'
      , username: 'a'
      , password: 'password1!'
      };
    });

    it('should invalidate when setting an invalid email', function() {
      options.email = 'a@mailinator .com';
      signupModel.set( options );
      signupModel.isValid().should.be.false;
    });

    it('should invalidate when setting an empty username', function() {
      var emptyValid = true
        , whitespaceValid = true;

      options.username = '';
      signupModel.set( options );
      emptyValid = signupModel.isValid();

      options.username = '   ';
      signupModel.set( options );
      whitespaceValid = signupModel.isValid();

      ( emptyValid && whitespaceValid ).should.be.false;
    });

    it('should invalidate when setting a password without a character in the set [_a-zA-Z0-9]', function() {
      options.password = '**!!@@';
      signupModel.set( options );
      signupModel.isValid().should.be.false;
    });

    it('should invalidate when setting a password without a character in the set [0-9]', function() {
      options.password = 'aa!!@@';
      signupModel.set( options );
      signupModel.isValid().should.be.false;
    });

    it('should invalidate when setting a password without a character in the set [^\\w\\s]', function() {
      options.password = 'aa1111';
      signupModel.set( options );
      signupModel.isValid().should.be.false;
    });
  });
});
