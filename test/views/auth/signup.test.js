describe('View :: Signup', function() {
  var signupView, SignupModel;

  before(function( done ) {
    require([ 'js/models/auth/signup' ], function( _SignupModel ) {
      SignupModel = _SignupModel;
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
      signupView.model.should.be.an.instanceof( SignupModel );
    });
  });
});
