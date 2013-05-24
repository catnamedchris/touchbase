var chai = require( 'chai' )
  , sinon = require( 'sinon' )
  , sinonChai = require( 'sinon-chai' )
  , should = chai.should();

chai.use( sinonChai );

describe('Database', function() {
  describe('connect()', function() {
    it('should attach a mongoose connection to req', function( done ) {
      var db = require( '../lib/db' );
      var req = res = {};
      db.connect(req, res, function() {
        req.mongoose.should.exist;
        req.mongoose.connection.close();
        done();
      });
    });
  });
});

describe('Route :: User', function() {
  describe('validate()', function() {
    it('should send an error if the data is invalid');
    it('should send call next() if the data is valid');
  });

  describe('create()', function() {
    it('should set the authenticated session variable to true upon successful save', function( done ) {
      var db = require( '../lib/db' )
        , user = require( '../routes/user' );

      var req = {
        body: {
          username: 'username'
        , email: 'email'
        , password: 'password'
        }
      , session: { authenticated: false }
      };
      var res = {};
      res.send = function() {};
      db.connect(req, res, function() {
        user.create( req, res );
        // Use a timeout for now because I don't know how to check
        // the session variable upon model saving.
        setTimeout(function() {
          req.session.authenticated.should.be.true;
          done();
        }, 300);
      });
    });
  });

  describe('login()', function() {
    it('should send 403 and relevant message if user is not available');
    it('should send 403 and relevant message if the username does not match');
    it('should send 403 and relevant message if the password does not match');
    it('should send 200 if the login was successful');
  });
});

