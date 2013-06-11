describe('View :: Signup', function() {
  var signupView, UserModel;

  before(function( done ) {
    require([ 'js/models/user/user' ], function( _UserModel ) {
      UserModel = _UserModel;
    });
    done();
  });

  beforeEach(function( done ) {
    require([ 'js/views/auth/signup' ], function( SignupView ) {
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
      signupView.model.should.be.an.instanceof( UserModel );
    });
  });
});
