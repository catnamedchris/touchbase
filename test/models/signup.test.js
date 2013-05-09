describe('Model :: Signup', function() {
  var signupModel;

  beforeEach(function( done ) {
    require([ 'models/auth/signup' ], function( SignupModel ){
      signupModel = new SignupModel();
      done();
    });
  });

  describe('Creation', function() {
    it('should exist', function() {
      signupModel.should.exist;
    });

    it('should have the correct URL attribute', function() {
      signupModel.url.should.equal('/signup');
    });

    it('should have an empty string first name by default', function() {
      signupModel.attributes.firstName.should.equal('');
    });

    it('should have an empty string last name by default', function() {
      signupModel.attributes.lastName.should.equal('');
    });

    it('should have an empty string email by default', function() {
      signupModel.attributes.email.should.equal('');
    });

    it('should have an empty string password by default', function() {
      signupModel.attributes.password.should.equal('');
    });
  });

  describe('Validation', function() {
  });
});
