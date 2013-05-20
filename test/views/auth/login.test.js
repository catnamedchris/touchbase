describe('View :: Login', function() {
  var loginView, LoginModel;

  before(function( done ) {
    require([ 'js/models/auth/login' ], function( _LoginModel ) {
      LoginModel = _LoginModel;
    });
    done();
  });

  beforeEach(function( done ) {
    require([ 'js/views/auth/login' ], function( LoginView ) {
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
  });
});
