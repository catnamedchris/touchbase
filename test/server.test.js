var chai = require( 'chai' )
  , sinon = require( 'sinon' )
  , sinonChai = require( 'sinon-chai' )
  , should = chai.should();

chai.use( sinonChai );

describe('Route :: User', function() {
  describe('validate()', function() {
    it('should send an error if the data is invalid');
    it('should call next() if the data is valid');
  });

  describe('create()', function() {
    // Fake req, res objects
    var req, res;

    before(function( done ) {
      var mongoose = require( 'mongoose' )
        , User = require( '../routes/user' );

      // Fake req, res objects
      req = {
        body: {
          username: 'username'
        , email: 'email'
        , password: 'password'
        }
      , session: { authenticated: false }
      };
      res = { send: function() {} };

      mongoose.connect( 'mongodb://localhost/touchbase' );
      mongoose.connection.once('open', function() {
        User.create( req, res );
        // Use a timeout for now because I don't know how to check
        // the session variable upon model saving.
        setTimeout(function() {
          mongoose.connection.close();
          done();
        }, 300);
      });
    });

    it('should set the authenticated session variable to true upon successful save', function() {
      req.session.authenticated.should.be.true;
    });

    it('should set the user _id session variable upon successful save', function() {
      req.session._id.should.exist;
    });
  });

  describe('login()', function() {
    it('should send 403 and relevant message if user is not available');
    it('should send 403 and relevant message if the username does not match');
    it('should send 403 and relevant message if the password does not match');
    it('should send 200 if the login was successful');
  });

  describe('friends()', function() {
    it('should return an array of friend objects');
  });
});

describe('Route :: New', function() {
  var req, res, spy;

  before(function( done ) {
    req = { session: {} };
    res = { render: function( page, data ) {} };
    spy = sinon.spy( res, 'render' );

    var mongoose = require( 'mongoose' );
    mongoose.connect( 'mongodb://localhost/touchbase' );
    mongoose.connection.once('open', function() {
      done();
    });
  });

  it('should render the index page when no session is authenticated', function( done ) {
    req.session.authenticated = false;
    require( '../routes/new' )( req, res );
    setTimeout(function() {
      spy.should.have.been.calledWith( 'index' );
      done();
    }, 300);
  });

  it('should render the home page when a session is authenticated', function( done ) {
    req.session.authenticated = true;

    var User = require( '../models/user' );
    User.find({ 'username': 'a' }, function( err, docs ) {
      req.session._id = docs[0]._id;
      require( '../routes/new' )( req, res );
      setTimeout(function() {
        spy.should.have.been.calledWith( 'home' );
        done();
      }, 300);
    });
  });
});
