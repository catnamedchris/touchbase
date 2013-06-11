describe('Model :: User', function() {
  var userModel;

  beforeEach(function( done ) {
    require([ 'js/models/user/user' ], function( UserModel ){
      userModel = new UserModel();
      done();
    });
  });

  describe('initialize()', function() {
    it('should exist', function() {
      userModel.should.exist;
    });

    it('should have the correct urlRoot attribute', function() {
      userModel.urlRoot.should.equal('/api/user');
    });

    it('should have an empty string email by default', function() {
      userModel.get( 'email' ).should.equal('');
    });

    it('should have an empty string username by default', function() {
      userModel.get( 'username' ).should.equal('');
    });

    it('should have an empty string password by default', function() {
      userModel.get( 'password' ).should.equal('');
    });
  });

  describe('validate()', function() {
    var attrs = {}, options = {}, validationError = null;

    beforeEach(function() {
      attrs = {
        email: 'a@mailinator.com'
      , username: 'a'
      , password: 'password1!'
      };
      options.validate = true;
      options.validateSignup = true;

      userModel.validationError = null;
    });

    it('should invalidate when setting an invalid email', function() {
      attrs.email = 'a@mailinator .com';
      userModel.set( attrs, options );
      userModel.validationError.should.be.truthy;
    });

    it('should invalidate when setting an empty username', function() {
      var emptyValid = true
        , whitespaceValid = true;

      attrs.username = '';
      userModel.set( attrs, options );
      userModel.validationError.should.be.truthy;

      userModel.validationError = null;
      attrs.username = '   ';
      userModel.set( attrs, options );
      userModel.validationError.should.be.truthy;
    });

    it('should invalidate when setting a password without a character in the set [_a-zA-Z0-9]', function() {
      attrs.password = '**!!@@';
      userModel.set( attrs, options );
      userModel.validationError.should.be.truthy;
    });

    it('should invalidate when setting a password without a character in the set [0-9]', function() {
      attrs.password = 'aa!!@@';
      userModel.set( attrs, options );
      userModel.validationError.should.be.truthy;
    });

    it('should invalidate when setting a password without a character in the set [^\\w\\s]', function() {
      attrs.password = 'aa1111';
      userModel.set( attrs, options );
      userModel.validationError.should.be.truthy;
    });
  });
});
